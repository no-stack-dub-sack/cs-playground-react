// @flow
import '../styles/controls.css'

import * as React from 'react'

import { ToastContainer, toast } from 'react-toastify'
import {
  nextChallenge,
  prevChallenge,
  resetEditorState,
  toggleSolution
} from '../actions/editor'

import ActionsMenu from './ActionMenu'
import BounceInBounceOut from './utils/BounceTransition'
import { Menu } from 'react-feather';
import { RESET_STATE } from '../utils/regexp'
import ReactTooltip from 'react-tooltip'
import type { State } from '../types/State'
import { apiURL } from '../App'
import axios from 'axios'
import { clearConsole } from '../actions/console'
import { connect } from 'react-redux'
import executeCode from '../utils/test/challenge/eval-code-run-tests'
import { findDOMNode } from 'react-dom'
import { isProd } from '../App'
import { map } from 'lodash-es';

const tipData = [
  ['menuTip', 'Expand Menu'],
  ['runCodeTip', 'Cmd/Ctrl + Enter'],
  ['prevTip','Cmd/Ctrl + Shift + <'],
  ['nextTip','Cmd/Ctrl + Shift + >']
]

type Props = {
  clearConsole: () => Object,
  code: string,
  id: string,
  nextChallenge: () => Object,
  prevChallenge: () => Object,
  resetEditorState: () => Object,
  theme: string,
  toggleSolution: () => Object,
}

type LocalState = {
  clearConsole: boolean,
  resetCount: number,
  renderActionsMenu: boolean
}

class Controls extends React.Component<Props, LocalState> {
  state = {
    clearConsole: false,
    resetCount: 0,
    renderActionsMenu: false
  }
  // type/init refs
  secretShareLinkInput: ?HTMLInputElement
  toastId: number
  menuTip: any

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
  handleKeyPress = (e: any) => {
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
    // Generate Share Link: CTRL + SHIFT + PlusSign
    if (e.ctrlKey && e.shiftKey && e.keyCode === 187) {
      this.generateShareLink()
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
  handleExecuteCode = ({ code, id }: Props) => {
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
  toggleActionsMenu = (): void => {
    this.setState({ renderActionsMenu: !this.state.renderActionsMenu });
    ReactTooltip.hide(findDOMNode(this.refs['Expand Menu']))
  }
  generateShareLink = (): void => {
    // NOTE: for test deployments change
    // to questionable-number.surge.sh
    const baseURL = isProd
      ? 'https://cs-playground-react.surge.sh'
      : 'http://localhost:3000'
    // make POST req to cs-pg-react-api and respond
    // with mongoId associated w/ stored code string.
    axios.post(`${apiURL}/insert-code`, {
      api_key: process.env.REACT_APP_API_KEY,
      code: this.props.code
    })
      .then(res => {
        // concat w/ base offer toast for user to copy to clipboard
        this.toastShareLink(`${baseURL}/share-repl/${res.data.hash}`)
      })
      .catch(err => {
        console.error(err)
        console.log('Error generating share link...')
      })
  }
  toastShareLink = (shareLink: string): void => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.error(
        `Click to copy share link: ${shareLink}`, {
          autoClose: false,
          onClose: () => this.copyShareLink(shareLink),
        }
      )
    }
  }
  copyShareLink = (shareLink) => {
    const input = this.secretShareLinkInput

    if (input) {
      input.value = shareLink
      input.select()
      document.execCommand('copy')
      this.toastId = toast.success(
        `Share link copied to clipboard!`, {
          autoClose: 2500,
          pauseOnHover: false
        }
      )
    }
  }
  render() {
    const buttonMeta = [
      ['menuTip', this.toggleActionsMenu, 'menu-button', <Menu />],
      ['runCodeTip', () => this.handleExecuteCode(this.props), 'run-code', 'Run Code'],
      ['prevTip', this.props.prevChallenge, 'previous', 'Previous'],
      ['nextTip', this.props.nextChallenge, 'next', 'Next']
    ]
    return (
      <React.Fragment>
        <section className={`main--controls ${this.props.theme}`}>
          {map(buttonMeta, button => (
            <button
              data-tip
              data-for={button[0]}
              onClick={button[1]}
              className={`main--controls--button ${this.props.theme} ${button[2]}`}
              key={button[0]}>
              {button[3]}
            </button>
          ))}
          {map(tipData, tip => (
            <ReactTooltip
              id={tip[0]}
              key={tip[0]}
              border={true}
              ref={ref => { if (tip[1] === 'Expand Menu') this.menuTip = ref }}
              effect='solid'
              delayShow={1000}>
              {tip[1]}
            </ReactTooltip>
          ))}
        </section>
        {/* Absolutely positioned components */}
        <ToastContainer
          closeButton={false}
          position="bottom-right"
          toastClassName={`toast ${this.props.theme}`}
          transition={BounceInBounceOut} />
        <ActionsMenu
          closeActionsMenu={this.toggleActionsMenu}
          render={this.state.renderActionsMenu}
          generateShareLink={this.generateShareLink}/>
        {/* dummy div for copying share link */}
        <input type="text" ref={ref => this.secretShareLinkInput = ref} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ editor: { current }, theme }: State) => ({
  code: current.code,
  id: current.id,
  theme: theme.current
})

const mapDispatchToProps = {
  clearConsole,
  nextChallenge,
  prevChallenge,
  resetEditorState,
  toggleSolution
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
