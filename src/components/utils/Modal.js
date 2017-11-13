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
      this.modal.parentNode.style.zIndex = '-4';
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
    // HACK: return items not links when !renderModal so that
    // LI items still appear when modal is transitioning out.
    // this is cause we are not actually unmounting the modal
    // we are simply making it transparent instead, and even
    // with a 0 z-index, the links could still be clicked on
    // through the editor background. this is purely out of
    // a mix of stuborness and laziness. I am too stuborn to
    // do away with the effect, and too lazy to implement it
    // properly with the react-transitions css package. Ughh!
    <li key={shortid.generate()}>
      { this.props.renderModal
        ? (<a href={item.href} rel="noopener noreferrer" target="_blank">
            {item.caption}
          </a>)
        : item.caption }
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
