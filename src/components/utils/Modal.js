import { connect } from 'react-redux'
import { closeModal } from '../../actions/modal'
import Fade from './Fader'
import { map } from 'lodash';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import shortid from 'shortid'
import '../../styles/modal.css'

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('click', this.closeModal)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeModal)
  }
  closeModal = ({ target }) => {
    if (
      this.props.renderModal &&
      !this.modal.contains(target) &&
      !target.classList.contains('modal-trigger')
    ) {
      this.props.closeModal()
    }
  }
  renderListItem = (item) => {
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
    return (
      <li
        dangerouslySetInnerHTML={{ __html: item }}
        key={shortid.generate()}
      />
    )
  }
  renderNumRemainingAnnouncements = () => {
    let num
    switch (localStorage.getItem('cs-pg-react-render-only-thrice')) {
      case '1': num = 2; break
      case '2': num = 1; break
      default: num = 0
    }
    return (
      <span>
        {`You will see this notification ${num} more time${num === 1 ? '' : 's'}`}
      </span>
    )
  }
  render() {
    const { renderModal, subHeader } = this.props
    return ReactDOM.createPortal(
      <Fade attachRef={ref => this.modal = ref} in={renderModal}>
        <div className="modal">
          <h2 className="modal--header">
            { this.props.header }
          </h2>
          { subHeader && <p>
            <strong dangerouslySetInnerHTML={{ __html: subHeader }} />
          </p> }
          <ul>
            { map(this.props.messages, this.renderListItem) }
          </ul>
          { this.props.modalType === 'announcement' &&
              this.renderNumRemainingAnnouncements() }
        </div>
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
