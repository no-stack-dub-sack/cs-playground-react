import '../../styles/menu.css'
import { CODE } from '../../assets/codeRef'
import { connect } from 'react-redux'
import MenuMap from './MenuMap'
import PropTypes from 'prop-types'
import React from 'react'
const {
  SORTING_ALGOS,
  DATA_STRUCTURES,
  EASY_ALGOS,
  MODERATE_ALGOS
} = CODE

const Menu = ({ theme, topHeight, transition }) => {
  return (
    <section
      className={`sidebar--menu top-pane ${theme}`}
      style={{ height: topHeight, transition }}>
      <header className="sidebar--menu--header">
        Contents
      </header>
      <MenuMap
        header="Sorting Algorithms"
        items={SORTING_ALGOS}
        name="SORTING_ALGOS"
      />
      <MenuMap
        header="Data Structures"
        items={DATA_STRUCTURES}
        name="DATA_STRUCTURES"
      />
      <details open>
        <summary className={`sidebar--menu--sub-header ${theme}`}>
          Algorithm Challenges
        </summary>
        <MenuMap
          header="Easy"
          items={EASY_ALGOS}
          name="EASY_ALGOS"
        />
        <MenuMap
          header="Moderate"
          xtraClass="sub"
          items={MODERATE_ALGOS}
          name="MODERATE_ALGOS"
        />
      </details>
    </section>
  )
}

Menu.propTypes = {
  theme: PropTypes.string.isRequired,
  topHeight: PropTypes.string.isRequired,
  transition: PropTypes.string.isRequired
}

const mapStateToProps = ({ panes, theme }) => ({
  theme: theme.current,
  topHeight: panes.topHeight,
  transition: panes.transition,
})

export default connect(mapStateToProps)(Menu)
