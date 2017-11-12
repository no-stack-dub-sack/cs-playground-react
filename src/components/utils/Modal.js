import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import ReactDOM from 'react-dom';
import shortid from 'shortid';

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
  renderListItem = (item) => (
    <li key={shortid.generate()}>
      <a href={item.href} rel="noopener noreferrer" target="_blank">
        {item.caption}
      </a>
    </li>
  )
  render() {
    return ReactDOM.createPortal(
      <div ref={ref => this.modal = ref}>
        { this.props.renderModal &&
        <div className="modal">
          <p className="modal--header">
            { `${this.props.modalId.replace(/_/g, ' ')} Resources` }
          </p>
          <ul>
            { this.props.resources.map(this.renderListItem) }
          </ul>
        </div> }
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
