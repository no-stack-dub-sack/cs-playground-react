import _ from 'lodash'
import { closeModal, openResourcesModal } from '../../actions/modal'
import { connect } from 'react-redux'
import { FileText, BookOpen } from 'react-feather'
import { selectChallenge, selectSolution } from '../../actions/editor'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import shortid from 'shortid'

_.mixin({
  'pascalCase': _.flow(
    _.camelCase,
    _.upperFirst
  )
})

const Buttons = ({ id, title, theme, selectSolution, renderModal }) => (
  <div className="sidebar--menu--detail--button--container">
    <FileText
      className={`sidebar--menu--detail--button solution ${theme}`}
      id={'SOLUTION__' + id}
      data-tip
      data-for='solutionTip'
      onClick={selectSolution} />
    <ReactTooltip id='solutionTip' type='dark' effect='solid' delayShow={300}>
      Solution
    </ReactTooltip>
    <BookOpen
      id={'MODAL__' + _.snakeCase(title)}
      className={`sidebar--menu--detail--button resources modal-trigger ${theme}`}
      data-tip
      data-for='bookTip'
      onClick={renderModal} />
    <ReactTooltip id='bookTip' type='dark' effect='solid' delayShow={300}>
      Resources
    </ReactTooltip>
  </div>
)

Buttons.propTypes = {
  id: PropTypes.string.isRequired,
  renderModal: PropTypes.func.isRequired,
  selectSolution: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

class MenuMap extends Component {
  selectChallenge = ({ currentTarget: { id }}) => {
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
    let itemClasses = id === this.props.codeId ? 'active ' : ''
    itemClasses += this.props.theme + ' ' + this.props.xtraClass
    return (
      <div
        className={`sidebar--menu--detail ${itemClasses}`}
        id={id}
        key={shortid.generate()}
        onClick={this.selectChallenge}>
        <span>
          {item.title}
        </span>
        {/* If challenge does not have resources or solution, e.g.
        repl or sort benchmarks, do not render button container */}
        { item.solution && item.resources &&
        <Buttons
          id={id}
          renderModal={this.renderModal}
          selectSolution={this.selectSolution}
          theme={this.props.theme}
          title={item.title} /> }
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
