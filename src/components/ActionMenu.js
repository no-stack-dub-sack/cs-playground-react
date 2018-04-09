import React, { Component } from 'react'

import Fade from './utils/Fader'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { Share } from 'react-feather'
import { connect } from 'react-redux'
import { openKeyBindingsModal } from '../actions/modal'

class ActionsMenu extends Component {
  openKeyBindingsModal = () => {
    this.props.openKeyBindingsModal()
    this.props.closeActionsMenu()
  }
  render() {
    const left = parseFloat(this.props.left)
    return ReactDOM.createPortal(
      <Fade
        duration={200}
        in={this.props.render}>
        <div
          onMouseLeave={this.props.render ? this.props.closeActionsMenu : undefined}
          className="main--controls--action-menu"
          style={{ left: left+.8+'%' }}>
            <div
              onClick={this.props.generateShareLink}
              className={`main--controls--action-menu--item ${this.props.theme}`}
              data-tip
              data-for="shareTip">
              <Share />
            </div>
            <div
              onClick={this.openKeyBindingsModal}
              className={`main--controls--action-menu--item ${this.props.theme} modal-trigger`}>
              Show Key Bindings Modal
            </div>
            <ReactTooltip
              id="shareTip"
              border={true}
              effect='solid'
              delayShow={1000}>
              Get Share Link
            </ReactTooltip>
        </div>
      </Fade>,
      document.getElementById('action-menu-root')
    )
  }
}

ActionsMenu.propTypes = {
  closeActionsMenu: PropTypes.func.isRequired,
  generateShareLink: PropTypes.func.isRequired,
  left: PropTypes.string.isRequired,
  openKeyBindingsModal: PropTypes.func.isRequired,
  render: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  left: state.panes.leftWidth,
  theme: state.theme.current,
})

export default connect(mapStateToProps, { openKeyBindingsModal })(ActionsMenu)
