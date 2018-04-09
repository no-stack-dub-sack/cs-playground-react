import { FileText, BookOpen } from 'react-feather'
import { snakeCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import ReactTooltip from 'react-tooltip'

const MenuButtons = ({ id, theme, title, selectSolution, renderModal }) => (
  <div className="sidebar--menu--detail--button--container">
    <FileText
      className={`sidebar--menu--detail--button solution ${theme}`}
      id={'SOLUTION__' + id}
      data-tip
      data-for='solutionTip'
      onClick={selectSolution} />
    <ReactTooltip
      id='solutionTip'
      type='dark'
      effect='solid'
      delayShow={300}>
      Solution
    </ReactTooltip>
    <BookOpen
      id={'MODAL__' + snakeCase(title)}
      className={`sidebar--menu--detail--button resources modal-trigger ${theme}`}
      data-tip
      data-for='bookTip'
      onClick={renderModal} />
    <ReactTooltip
      id='bookTip'
      type='dark'
      effect='solid'
      delayShow={300}>
      Resources
    </ReactTooltip>
  </div>
)

MenuButtons.propTypes = {
  id: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectSolution: PropTypes.func.isRequired,
  renderModal: PropTypes.func.isRequired
}

export default MenuButtons
