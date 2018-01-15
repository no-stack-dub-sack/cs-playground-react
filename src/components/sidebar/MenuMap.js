import { closeModal, openResourcesModal } from '../../actions/modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { selectSnippet, selectSolution } from '../../actions/editor';
import shortid from 'shortid';
import _ from 'lodash';

_.mixin({
  'pascalCase': _.flow(
    _.camelCase,
    _.upperFirst
  )
});

class MenuMap extends Component {
  selectSeed = ({ currentTarget: { id }}) => {
    this.props.selectSnippet(id);
  }
  selectSolution = (e) => {
    e.stopPropagation();
    this.props.selectSolution(e.target.id.slice(10));
  }
  renderModal = (e) => {
    e.stopPropagation();
    const modalId = _.startCase(e.target.id.slice(7));
    this.props.modalId === modalId && this.props.renderModal
      ? this.props.closeModal()
      : this.props.openResourcesModal(modalId);
  }
  renderMenuItem = (item) => {
    const id = _.pascalCase(item.title);
    const background = id === this.props.codeId
      ? 'rgba(39, 145, 152, 0.52)'
      : '#707070';
    return (
      <div
        style={{ background }}
        className={`sidebar--menu--detail ${ this.props.xtraClass }`}
        id={id}
        key={shortid.generate()}
        onClick={this.selectSeed}>
        <span>
          {item.title}
        </span>
        { !/Benchmarks/.test(item.title) &&
        <div className="sidebar--menu--detail--button--container">
          <span
            className="sidebar--menu--detail--button solution"
            id={'SOLUTION__' + id}
            onClick={this.selectSolution}>
            Solution
          </span>
          <span
            id={'MODAL__' + _.snakeCase(item.title)}
            className="sidebar--menu--detail--button resources modal-trigger"
            onClick={this.renderModal}>
            Resources
          </span>
        </div> }
      </div>
    );
  }
  render() {
    return (
      <details open>
        <summary className="sidebar--menu--sub-header">
          {this.props.header}
        </summary>
        {this.props.items.map(this.renderMenuItem)}
      </details>
    );
  }
};

MenuMap.propTypes = {
  closeModal: PropTypes.func.isRequired,
  codeId: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  modalId: PropTypes.string.isRequired,
  openResourcesModal: PropTypes.func.isRequired,
  renderModal: PropTypes.bool.isRequired,
  selectSnippet: PropTypes.func.isRequired,
  selectSolution: PropTypes.func.isRequired,
  xtraClass: PropTypes.string,
}

MenuMap.defaultProps = {
  xtraClass: ''
}

const mapStateToProps = (state) => ({
  modalId: state.modal.modalId,
  renderModal: state.modal.renderModal,
  codeId: state.editor.current.id
});

const mapDispatchToProps = {
  selectSnippet,
  selectSolution,
  openResourcesModal,
  closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMap);
