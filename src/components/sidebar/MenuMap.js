import _ from 'lodash'
import { closeModal, openResourcesModal } from '../../actions/modal'
import { connect } from 'react-redux'
import { isMenuOpen, toggleMenu } from '../../actions/menu'
import { selectChallenge, selectSolution } from '../../actions/editor'
import MenuButtons from '../utils/MenuButtons'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shortid from 'shortid'

_.mixin({
  'pascalCase': _.flow(
    _.camelCase,
    _.upperFirst
  )
})

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
  toggleMenu = (e) => {
    e.stopPropagation()
    e.currentTarget.open
      ? this.props.toggleMenu({ name: this.props.name, open: true })
      : this.props.toggleMenu({ name: this.props.name, open: false })
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
        <MenuButtons
          id={id}
          theme={this.props.theme}
          title={item.title}
          renderModal={this.renderModal}
          selectSolution={this.selectSolution} /> }
      </div>
    )
  }
  render() {
    const isOpen = isMenuOpen(this.props.menuState, this.props.name)
    return (
      <details open={isOpen} onToggle={this.toggleMenu}>
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
  menuState: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalId: PropTypes.string.isRequired,
  name: PropTypes.string,
  openResourcesModal: PropTypes.func.isRequired,
  renderModal: PropTypes.bool.isRequired,
  selectChallenge: PropTypes.func.isRequired,
  selectSolution: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  xtraClass: PropTypes.string,
}

MenuMap.defaultProps = {
  xtraClass: ''
}

const mapStateToProps = (state) => ({
  codeId: state.editor.current.id,
  menuState: state.menu,
  modalId: state.modal.modalId,
  renderModal: state.modal.renderModal,
  theme: state.theme.current,
})

const mapDispatchToProps = {
  closeModal,
  openResourcesModal,
  selectChallenge,
  selectSolution,
  toggleMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMap)
