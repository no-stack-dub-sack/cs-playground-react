import { indexOf, map, replace } from 'lodash'
import { connect } from 'react-redux'
import { selectChallenge, addRepl } from '../../actions/editor'
import { openConfirmModal } from '../../actions/modal'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shortid from 'shortid'
import { PlusSquare, Trash2 } from 'react-feather'
import ReactTooltip from 'react-tooltip'

import { ToastContainer, toast } from 'react-toastify';
import Transition from 'react-transition-group/Transition';

const BounceInBounceOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={700}
    onEnter={node => node.classList.add('bounceIn', 'animate')}
    onExit={node => {
      node.classList.remove('bounceIn', 'animate');
      node.classList.add('bounceOut', 'animate');
    }}>
    {children}
  </Transition>
);

const Button = ({ id, theme, renderModal }) => (
  <div className="sidebar--menu--detail--button--container">
    <Trash2
      className={`sidebar--menu--detail--button resources modal-trigger ${theme}`}
      id={'PROMPT_DELETE__' + id}
      data-tip
      data-for='trashCanTip'
      onClick={renderModal} />
    <ReactTooltip
      delayShow={300}
      effect='solid'
      id='trashCanTip'
      type='dark'>
      Delete Repl
    </ReactTooltip>
  </div>
)

class ReplsMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  handleChange = ({ target: { value } }) => {
    this.setState({ value })
  }
  notifyDuplicate = () => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast.error(
        `There is already a repl or challenge with the name ${this.state.value}`
      )
    }
  }
  handleAddRepl = (e) => {
    e.preventDefault()
    const { value } = this.state
    const snakeCased = replace(value, /\s/g, '_')
    if (
      // error handling for dupe challenge / repl names
      indexOf(this.props.challenges, snakeCased) === -1 &&
      indexOf(this.props.challenges, value) === -1
    ) {
      this.props.addRepl(snakeCased)
      this.setState({ value: '' })
    } else {
      this.notifyDuplicate()
    }
  }
  selectChallenge = ({ currentTarget: { id }}) => {
    this.props.selectChallenge(id)
  }
  renderModal = (e) => {
    e.stopPropagation()
    this.props.openConfirmModal(e.currentTarget.id.slice(15))
  }
  renderMenuItem = (item, i) => {
    const id = replace(item, /\s/g, '_')
    let itemClasses = id === this.props.codeId ? 'active ' : ''
    itemClasses += this.props.theme
    return (
      <div
        className={`sidebar--menu--detail ${itemClasses}`}
        id={id}
        key={shortid.generate()}
        onClick={this.selectChallenge}>
        <span>
          {replace(item, /_/g, ' ')}
        </span>
        { i !== 0 && /* do not allow delete for Free Code repl */
        <Button
          id={id}
          renderModal={this.renderModal}
          theme={this.props.theme}  /> }
      </div>
    )
  }
  render() {
    return (
      <React.Fragment>
        <details open>
          <summary className={`sidebar--menu--sub-header ${this.props.theme}`}>
            Repls
          </summary>
          { map(this.props.repls, this.renderMenuItem) }
          <div className={`sidebar--menu--detail ${this.props.theme}`}>
            <PlusSquare
              className={`sidebar--menu--input-icon ${this.props.theme}`}
              onClick={() => this.input.focus()} />
            <form onSubmit={this.handleAddRepl}>
              {/* Error handling? No dupe IDs */}
              <input
                value={this.state.value}
                onChange={this.handleChange}
                ref={ref => this.input = ref}
                type="text" />
            </form>
          </div>
        </details>
        <ToastContainer
          autoClose={3000}
          closeButton={false}
          position="bottom-right"
          transition={BounceInBounceOut} />
      </React.Fragment>
    )
  }
}

ReplsMap.propTypes = {
  challenges: PropTypes.array.isRequired,
  addRepl: PropTypes.func.isRequired,
  codeId: PropTypes.string.isRequired,
  repls: PropTypes.array.isRequired,
  selectChallenge: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}

const mapStateToProps = ({ editor, theme }) => ({
  challenges: editor.orderKey,
  codeId: editor.current.id,
  theme: theme.current,
  repls: editor.orderKey.slice(editor.orderKey.indexOf('Free_Code'))
})

const mapDispatchToProps = {
  addRepl,
  openConfirmModal,
  selectChallenge
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplsMap)
