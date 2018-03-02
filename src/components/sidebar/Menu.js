import '../../styles/menu.css'
import { CODE } from '../../assets/codeRef'
import { connect } from 'react-redux'
import { isMenuOpen, toggleMenu } from '../../actions/menu'
import MenuMap from './MenuMap'
import PropTypes from 'prop-types'
import React from 'react'

const {
  SORTING_ALGOS,
  DATA_STRUCTURES,
  EASY_ALGOS,
  MODERATE_ALGOS
} = CODE

class Menu extends React.Component {
  toggleMenu = (e) => {
    e.stopPropagation()
    e.currentTarget.open
      ? this.props.toggleMenu({ name: e.currentTarget.id, open: true })
      : this.props.toggleMenu({ name: e.currentTarget.id, open: false })
  }
  render() {
    const { topHeight: height, transition } = this.props
    const isOpen = isMenuOpen(this.props.menuState, 'ALGORITHM_CHALLENGES')
    return (
      <section
        className={`sidebar--menu top-pane ${this.props.theme}`}
        style={{ height, transition }}>
        <header className="sidebar--menu--header">
          Contents
        </header>
        <MenuMap
          header="Sorting Algorithms"
          items={SORTING_ALGOS}
          name="SORTING_ALGOS" />
        <MenuMap
          header="Data Structures"
          items={DATA_STRUCTURES}
          name="DATA_STRUCTURES" />
        <details
          open={isOpen}
          onToggle={this.toggleMenu}
          id="ALGORITHM_CHALLENGES">
          <summary className={`sidebar--menu--sub-header ${this.props.theme}`}>
            Algorithm Challenges
          </summary>
          <MenuMap
            header="Easy"
            items={EASY_ALGOS}
            name="EASY_ALGOS" />
          <MenuMap
            header="Moderate"
            xtraClass="sub"
            items={MODERATE_ALGOS}
            name="MODERATE_ALGOS" />
        </details>
      </section>
    )
  }
}

Menu.propTypes = {
  theme: PropTypes.string.isRequired,
  topHeight: PropTypes.string.isRequired,
  transition: PropTypes.string.isRequired,
  menuState: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = ({ panes, theme, menu }) => ({
  theme: theme.current,
  topHeight: panes.topHeight,
  transition: panes.transition,
  menuState: menu
})

export default connect(mapStateToProps, { toggleMenu })(Menu)
