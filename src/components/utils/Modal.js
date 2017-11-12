import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ModalWrap extends Component {
  render() {
    return ReactDOM.createPortal(
      <div ref={ref => this.modal = ref}>
       { this.props.children }
      </div>,
      document.getElementById('modal-container')
    );
  }
}

export default ModalWrap;
