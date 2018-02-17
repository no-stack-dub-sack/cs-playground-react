import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal'
import Fade from './Fader'
import { map } from 'lodash';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { RENDR_MODAL } from '../../utils/localStorageKeys'
import shortid from 'shortid'
import '../../styles/modal.css'

// modal types:
const ResourcesModal = (props) => (
  <div className="modal">
    <h2 className="modal--header">
      { props.header }
    </h2>
    <ul>
      { map(props.messages, props.renderListItem) }
    </ul>
  </div>
)

const AnnouncementModal = (props) => (
  <div className="modal">
    <h2 className="modal--header">
      { props.header }
    </h2>
    <p>
      <strong dangerouslySetInnerHTML={{ __html: props.subHeader }} />
    </p>
    <ul>
      { map(props.messages, props.renderListItem) }
    </ul>
    <p>
      <strong dangerouslySetInnerHTML={{ __html:
          props.messages[props.messages.length-1]}} />
    </p>
    {(() => {
        let num = localStorage.getItem(RENDR_MODAL)
        num = num === '1' ? 2 : num === '2' ? 1 : 0
        return (
          <span>
            {`You will see this notification ${num} more time${num === 1 ? '' : 's'}`}
          </span>
        )
    })()}
  </div>
)

const ThemeModal = ({ header }) => (
  <h2
    className="modal"
    style={{ padding: 20, boxShadow: 'none', opacity: 0.8 }}>
    { header }
  </h2>
)

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('click', this.closeModal)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeModal)
  }
  // close modal on click if modal is open, if current click
  // is not inside modal, and if target is not a modal trigger,
  // (and if target's parent is not a modal trigger — to account
  // for clicking the path or line of new SVG icons)
  closeModal = ({ target }) => {
    if (
      this.props.renderModal &&
      !this.modal.contains(target) &&
      !this.targetContainsModalTrigger(target)
    ) {
      this.props.closeModal()
    }
  }
  // closeModal util, see above
  targetContainsModalTrigger = (t) => {
    if ((
      t.classList &&
      t.classList.contains('modal-trigger')
      ) || (
        t.parentElement.classList &&
        t.parentElement.classList.contains('modal-trigger')
      )) return true
    return false
  }
  renderListItem = (item, i, arr) => {
    if (this.props.modalType === 'resources') {
      return (
        <li key={shortid.generate()}>
          <a href={item.href} rel="noopener noreferrer" target="_blank">
            {item.caption}
          </a>
        </li>
      )
    }
    // Announcement Modal:
    return i !== arr.length - 1 && (
      <li
        dangerouslySetInnerHTML={{ __html: item }}
        key={shortid.generate()}
      />
    )
  }
  render() {
    const { renderModal, header, modalType } = this.props
    return ReactDOM.createPortal(
      <Fade
        attachRef={ref => this.modal = ref}
        in={renderModal}
        duration={modalType === 'theme' ? {enter: 50, exit: 100} : 450}>
        { modalType === 'announcement'
          ? <AnnouncementModal
              { ...this.props }
              renderListItem={this.renderListItem}
              renderNumAnnounced={this.renderNumAnnounced} />
          : modalType === 'resources'
          ?  <ResourcesModal
              { ...this.props }
              renderListItem={this.renderListItem} />
          : <ThemeModal header={header} /> }
      </Fade>,
      document.getElementById('modal-root')
    )
  }
}

Modal.propTypes = {
  messages: PropTypes.array.isRequired,
  renderModal: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  subHeader: PropTypes.string,
  modalType: PropTypes.string.isRequired
}

const mapStateToProps = ({ modal }) => {
  return {
    messages: modal.messages,
    renderModal: modal.renderModal,
    header: modal.modalId,
    subHeader: modal.subHeader,
    modalType: modal.modalType
  }
}

export default connect(mapStateToProps, { closeModal })(Modal)
