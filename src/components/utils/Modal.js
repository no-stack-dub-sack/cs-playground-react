import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import Fade from './Fader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';
import '../../styles/modal.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('click', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeModal);
  }
  closeModal = ({ target }) => {
    if (!target.classList.contains('modal-trigger') &&
      !this.modal.contains(target) &&
      this.props.renderModal) {
      this.props.closeModal();
    }
  }
  componentDidUpdate() {
    if (this.props.renderModal) {
      this.modal.parentNode.style.zIndex = '4';
    } else {
      this.modal.parentNode.style.zIndex = '-4';
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
      );
    }
    // Announcement Modal:
    return (
      <li
        dangerouslySetInnerHTML={{ __html: item }}
        key={shortid.generate()}
      />
    );
  }
  render() {
    return ReactDOM.createPortal(
      <Fade attachRef={ref => this.modal = ref} in={this.props.renderModal}>
        <div className="modal">
          <h2 className="modal--header">
            { this.props.header }
          </h2>
          { this.props.subHeader &&
            <p>
              <strong dangerouslySetInnerHTML={{ __html: this.props.subHeader }} />
            </p> }
          <ul>
            { this.props.messages.map(this.renderListItem) }
          </ul>
        </div>
      </Fade>,
      document.getElementById('modal-root')
    );
  }
}

Modal.propTypes = {
  messages: PropTypes.array.isRequired,
  renderModal: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  subHeader: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, { closeModal })(Modal);
