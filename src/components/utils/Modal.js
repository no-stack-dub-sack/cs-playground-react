import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
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
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.renderModal) {
      this.modal.parentNode.style.zIndex = '0';
    } else {
      this.modal.parentNode.style.zIndex = '4';
    }
  }
  closeModal = ({ target }) => {
    if (!target.classList.contains('modal-trigger') &&
      !this.modal.contains(target) &&
      this.props.renderModal) {
      this.props.closeModal();
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
    const modalClass = this.props.renderModal ? 'show' : 'hide';
    return ReactDOM.createPortal(
      <div ref={ref => this.modal = ref}>
        <div className={ `modal ${modalClass}` }>
          <h2 className="modal--header">
            { `${this.props.modalId.replace(/_/g, ' ')} Resources` }
          </h2>
          { this.props.resources.map(this.renderListItem) }
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources,
    renderModal: state.modal.renderModal,
    modalId: state.modal.modalId
  }
};

export default connect(mapStateToProps, { closeModal })(Modal);
