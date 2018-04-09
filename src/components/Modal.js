import '../styles/modal.css'

import React, { Component } from 'react'

import AnnouncementModal from './modals/AnnouncementModal';
import BindingsModal from './modals/BindingsModal';
import ConfirmModal from './modals/ConfirmModal';
import Fade from './utils/Fader'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ResourcesModal from './modals/ResourcesModal';
import ThemeModal from './modals/ThemeModal';
import { closeModal } from '../actions/modal'
import { connect } from 'react-redux'
import { deleteRepl } from '../actions/editor'
import shortid from 'shortid'

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
  deleteRepl = ({ target: { id } }) => {
    this.props.deleteRepl(id.slice(8))
    this.props.closeModal()
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
          : modalType === 'bindings'
          ? <BindingsModal { ...this.props } />
          : modalType === 'resources'
          ? <ResourcesModal
              { ...this.props }
              renderListItem={this.renderListItem} />
          : modalType === 'confirm'
          ? <ConfirmModal
              closeModal={this.props.closeModal}
              deleteRepl={this.deleteRepl}
              id={header}
              theme={this.props.theme} />
          : <ThemeModal header={header} /> }
      </Fade>,
      document.getElementById('modal-root')
    )
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  modalType: PropTypes.string.isRequired,
  renderModal: PropTypes.bool.isRequired,
  subHeader: PropTypes.string,
  theme: PropTypes.string.isRequired
}

const mapStateToProps = ({ modal, theme }) => {
  return {
    header: modal.modalId,
    messages: modal.messages,
    modalType: modal.modalType,
    renderModal: modal.renderModal,
    subHeader: modal.subHeader,
    theme: theme.current
  }
}

export default connect(mapStateToProps, { closeModal, deleteRepl })(Modal)
