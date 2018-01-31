import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

const Pane = ({
  children,
  className,
  leftWidth,
  rightWidth,
  theme
}) => (
  <main
    className={className.includes('left-pane')
      ? `${className} ${theme}`
      : className }
    style={{ width: className.includes('left-pane')
      ? leftWidth
      : rightWidth }}>
    { children }
  </main>
)

Pane.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  leftWidth: PropTypes.string.isRequired,
  rightWidth: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
}

const mapStateToProps = ({ panes, theme }) => ({
  leftWidth: panes.leftWidth,
  rightWidth: panes.rightWidth,
  theme: theme.current
})

export default connect(mapStateToProps)(Pane)
