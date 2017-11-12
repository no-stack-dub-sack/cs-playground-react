import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectSnippet, selectSolution } from '../../actions/code';
import { closeModal, openModal } from '../../actions/modal';
import { selectTopic } from '../../actions/resources';
import shortid from 'shortid';

class MenuMap extends Component {
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
    this.props.selectTopic(e.target.id);
    if (this.props.modalId === e.target.id) {
      this.props.closeModal();
    } else {
      this.props.openModal(e.target.id);
    }
  }
  renderItem = (item) => (
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
          id={`SOLUTION__${ item.title.replace(/\s/g, '') }`}
          onClick={this.selectSolution}>
          Solution
        </span>
        <span
          id={`${ item.title.replace(/\s/g, '_') }`}
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

const mapDispatchToProps = {
  selectSnippet,
  selectSolution,
  selectTopic,
  openModal,
  closeModal
};

export default connect(
  ({ modal: { modalId } }) => ({ modalId }),
  mapDispatchToProps
)(MenuMap);
