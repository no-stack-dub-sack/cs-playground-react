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
  renderListItem = (item) => (
    <li key={shortid.generate()}>
      <a href={item.href} rel="noopener noreferrer" target="_blank">
        {item.caption}
      </a>
    </li>
  )
  render() {
    return ReactDOM.createPortal(
      <Fade attachRef={ref => this.modal = ref} in={this.props.renderModal}>
        <div className="modal">
          <h2 className="modal--header">
            { `${this.props.modalId.replace(/_/g, ' ')} Resources` }
          </h2>
          { this.props.resources.map(this.renderListItem) }
        </div>
      </Fade>,
      document.getElementById('modal-root')
    );
  }
}

Modal.propTypes = {
  resources: PropTypes.array.isRequired,
  renderModal: PropTypes.bool.isRequired,
  modalId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources,
    renderModal: state.modal.renderModal,
    modalId: state.modal.modalId
  }
}

export default connect(mapStateToProps, { closeModal })(Modal);
