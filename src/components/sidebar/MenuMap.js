import { closeModal, openResourcesModal } from '../../actions/modal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { selectChallenge, selectSolution } from '../../actions/editor'
import shortid from 'shortid'
import { FileText, BookOpen } from 'react-feather'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'

_.mixin({
  'pascalCase': _.flow(
    _.camelCase,
    _.upperFirst
  )
})

class MenuMap extends Component {
  selectSeed = ({ currentTarget: { id }}) => {
    this.props.selectChallenge(id)
  }
  // stop event propagation to prevent events
  // bound to containing elements from firing
  selectSolution = (e) => {
    e.stopPropagation()
    this.props.selectSolution(e.currentTarget.id.slice(10))
  }
  renderModal = (e) => {
    e.stopPropagation()
    const modalId = _.startCase(e.currentTarget.id.slice(7))
    this.props.modalId === modalId && this.props.renderModal
      ? this.props.closeModal()
      : this.props.openResourcesModal(modalId)
  }
  renderMenuItem = (item) => {
    const id = _.pascalCase(item.title)
    return (
      <div
        className={`sidebar--menu--detail ${id === this.props.codeId ? 'active' : ''} ${this.props.theme} ${ this.props.xtraClass }`}
        id={id}
        key={shortid.generate()}
        onClick={this.selectSeed}>
        <span>
          {item.title}
        </span>
        { !/Benchmarks/.test(item.title) &&
        <div className="sidebar--menu--detail--button--container">
          <FileText
            className={`sidebar--menu--detail--button solution ${this.props.theme}`}
            id={'SOLUTION__' + id}
            data-tip
            data-for='solutionTip'
            onClick={this.selectSolution} />
          <ReactTooltip id='solutionTip' type='dark' effect='solid' delayShow={300}>Solution</ReactTooltip>
          <BookOpen
            id={'MODAL__' + _.snakeCase(item.title)}
            className={`sidebar--menu--detail--button resources modal-trigger ${this.props.theme}`}
            data-tip
            data-for='bookTip'
            onClick={this.renderModal} />
          <ReactTooltip id='bookTip' type='dark' effect='solid' delayShow={300}>Resources</ReactTooltip>
        </div> }
      </div>
    )
  }
  render() {
    return (
      <details open>
        <summary className={`sidebar--menu--sub-header ${this.props.theme}`}>
          {this.props.header}
        </summary>
        { _.map(this.props.items, this.renderMenuItem) }
      </details>
    )
  }
}

MenuMap.propTypes = {
  closeModal: PropTypes.func.isRequired,
  codeId: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  modalId: PropTypes.string.isRequired,
  openResourcesModal: PropTypes.func.isRequired,
  renderModal: PropTypes.bool.isRequired,
  selectChallenge: PropTypes.func.isRequired,
  selectSolution: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  xtraClass: PropTypes.string,
}

MenuMap.defaultProps = {
  xtraClass: ''
}

const mapStateToProps = (state) => ({
  modalId: state.modal.modalId,
  renderModal: state.modal.renderModal,
  codeId: state.editor.current.id,
  theme: state.theme.current
})

const mapDispatchToProps = {
  selectChallenge,
  selectSolution,
  openResourcesModal,
  closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMap)
