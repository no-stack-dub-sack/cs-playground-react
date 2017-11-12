import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalWrap from '../utils/Modal';
import { selectSnippet, selectSolution } from '../../actions/editor';
import shortid from 'shortid';

class MenuMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderModal: false
    };
  }
  componentDidMount() {
    document.addEventListener('click', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeModal);
  }
  closeModal = ({ target }) => {
    if (target.classList.contains('modal-trigger')) {
      return;
    } else if (!this.wrap.modal.contains(target) && this.state.renderModal) {
      this.setState({ renderModal: false });
    }
  }
  selectSeed = (e) => {
    e.stopPropagation();
    this.props.selectSnippet(e.target.id);
  }
  selectSolution = (e) => {
    e.stopPropagation();
    this.props.selectSolution(e.target.id);
  }
  renderModal = (e) => {
    e.stopPropagation();
    this.setState({ renderModal: !this.state.renderModal });
  }
  renderItem = (item, i) => (
    <div
      className={`sidebar--menu--detail ${ this.props.xtraClass }`}
      id={item.title.replace(/\s/g, '')}
      key={shortid.generate()}
      onClick={this.selectSeed}>
      <span>
        {item.title}
      </span>
      { !/Benchmarks/.test(item.title) &&
      <div className="sidebar--menu--detail--button--container">
        <span
          className="sidebar--menu--detail--button solution"
          id={`__${ item.title.replace(/\s/g, '') }`}
          onClick={this.selectSolution}>
          Solution
        </span>
        <span
          className="sidebar--menu--detail--button resources modal-trigger"
          onClick={this.renderModal}>
          Resources
        </span>
      </div> }
    </div>
  )
  render() {
    return (
      <details open>
        <summary className="sidebar--menu--sub-header">
          {this.props.header}
        </summary>
        {this.props.items.map(this.renderItem)}
        {/* ModalWrap is a portal rendered component */}
        <ModalWrap ref={ref => this.wrap = ref}>
          { this.state.renderModal &&
          <div className="modal">
            <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">hello</a>
          </div> }
        </ModalWrap>
      </details>
    );
  }
};

MenuMap.propTypes = {
  header: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  xtraClass: PropTypes.string
};

MenuMap.defaultProps = {
  xtraClass: ''
};

export default connect(null, { selectSnippet, selectSolution })(MenuMap);
