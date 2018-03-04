import '../styles/controls.css'

import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { apiURL, isProd } from '../App'
import {
  nextChallenge,
  prevChallenge,
  resetEditorState,
  toggleSolution
} from '../actions/editor'

import BounceInBounceOut from './utils/BounceTransition'
import PropTypes from 'prop-types'
import { RESET_STATE } from '../utils/regexp'
import ReactTooltip from 'react-tooltip'
import { Share } from 'react-feather';
import axios from 'axios'
import { clearConsole } from '../actions/console'
import { connect } from 'react-redux'
import executeCode from '../utils/test/challenge/eval-code-run-tests'

const tipData = [
  ['shareTip', 'Get Share Link'],
  ['runCodeTip', 'Cmd/Ctrl + Enter'],
  ['prevTip','Cmd/Ctrl + Shift + <'],
  ['nextTip','Cmd/Ctrl + Shift + >']
]

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clearConsole: false,
      resetCount: 0
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ clearConsole: true })
    }
  }
  handleKeyPress = (e) => {
    // Run Code: CMD/CTRL + ENTER
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
      this.handleExecuteCode(this.props)
    }
    // Next Challenge: CMD/CTRL + SHIFT + >
    // Previous Challenge: CMD/CTRL + SHIFT + <
    // Toggle Solution: CMD/CTRL + SHIFT + S
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
      if (e.keyCode === 190) this.props.nextChallenge()
      if (e.keyCode === 188) this.props.prevChallenge()
      if (e.keyCode === 83) this.props.toggleSolution()
    }
    // Clear Console: ALT + SHIFT + BACKSPACE
    if (e.altKey && e.shiftKey && e.keyCode === 8) {
      // prevent Backspace default
      e.preventDefault()
      this.props.clearConsole()
    }
  }
  toggleClearConsole = () => {
    if (this.state.clearConsole) {
      this.props.clearConsole()
      this.setState({ clearConsole: false })
    }
  }
  clearConsoleResetCount = () => {
    this.setState({ resetCount: 0 })
    this.props.clearConsole()
  }
  handleResetSate = () => {
    if (this.state.resetCount === 0) {
      this.setState(state => ({ resetCount: state.resetCount+1 }))
      this.props.clearConsole()
      console.log(
        'WARNING: Are you sure you want to reset?\n' +
        'This action CANNOT be reversed, and all of\n' +
        'your solutions will be permanently deleted.\n' +
        "To proceed, hit the 'Run Code' button again."
      )
      // reset count after 15 seconds to prevent accidental resets
      setTimeout(() => {
        if (this.state.resetCount === 1) {
          this.clearConsoleResetCount()
          console.log('Global state reset timed out. Please try again.')
        }
      }, 15000)
    } else {
      this.props.resetEditorState()
      this.clearConsoleResetCount()
      console.log('State successfully reset!')
    }
  }
  handleExecuteCode = ({ code, id }) => {
    this.toggleClearConsole()
    if (RESET_STATE.test(code)) {
      this.handleResetSate()
    } else {
      // if last action was handleResetSate and the resetState() call
      // has been deleted reset resetCount to prevent accidental resets
      this.state.resetCount === 1 && this.clearConsoleResetCount()
      // run code && execute tests
      executeCode(
        code,
        id
      )
    }
  }
  generateShareLink = () => {
    const baseURL = isProd
      // NOTE: Change for prod to CS-Address!
      ? 'https://questionable-number.surge.sh'
      : 'http://localhost:3000'
    // make POST req to cs-pg-react-api and respond
    // with mongoId associated w/ stored code string.
    axios.post(`${apiURL}/insert-code`, {
      api_key: process.env.REACT_APP_API_KEY,
      code: this.props.code
    })
      .then(res => {
        // concat w/ base & copy to clipboard as share link
        this.toastShareLink(`${baseURL}/share-repl/${res.data.hash}`)
      })
      .catch(err => {
        console.error(err)
        console.log('Error generating share link...')
      })
  }
  toastShareLink = (shareLink) => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.error(
        `Your share link is ${shareLink}`, {
          autoClose: 5000,
          closeOnClick: false
        }
      )
    }
  }
  render() {
    return (
      <React.Fragment>
        <section className={`main--controls ${this.props.theme}`}>
          <button
            onClick={this.generateShareLink}
            className={`main--controls--button ${this.props.theme} share-code`}
            data-tip
            data-for="shareTip">
            <Share />
          </button>
          <button
            onClick={() => this.handleExecuteCode(this.props)}
            className={`main--controls--button ${this.props.theme} run-code`}
            data-tip
            data-for="runCodeTip">
            Run Code
          </button>
          <button
            onClick={this.props.prevChallenge}
            className={`main--controls--button ${this.props.theme} previous`}
            data-tip
            data-for="prevTip">
            Previous
          </button>
          <button
            onClick={this.props.nextChallenge}
            className={`main--controls--button ${this.props.theme} next`}
            data-tip
            data-for="nextTip">
            Next
          </button>
          {tipData.map(tip => (
            <ReactTooltip
              id={tip[0]}
              key={tip[0]}
              border={true}
              effect='solid'
              delayShow={1000}>
              {tip[1]}
            </ReactTooltip>
          ))}
        </section>
        <ToastContainer
          closeButton={false}
          position="bottom-right"
          toastClassName={`toast ${this.props.theme}`}
          transition={BounceInBounceOut} />
        {/* dummy div for copying share link */}
        <input type="text" ref={ref => this.dummy = ref} />
      </React.Fragment>
    )
  }
}

Controls.propTypes = {
  clearConsole: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  nextChallenge: PropTypes.func.isRequired,
  prevChallenge: PropTypes.func.isRequired,
  resetEditorState: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  toggleSolution: PropTypes.func.isRequired
}

const mapStateToProps = ({ editor: { current }, theme }) => {
  return {
    code: current.code,
    id: current.id,
    theme: theme.current
  }
}

const mapDispatchToProps = {
  clearConsole,
  nextChallenge,
  prevChallenge,
  resetEditorState,
  toggleSolution
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
