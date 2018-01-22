import { CODE } from '../../assets/codeRef';
import { connect } from 'react-redux';
import MenuMap from './MenuMap';
import PropTypes from 'prop-types';
import React from 'react';
import '../../styles/menu.css';

const {
  SORTING_ALGOS,
  DATA_STRUCTURES,
  EASY_ALGOS,
  MODERATE_ALGOS
} = CODE;

const Menu = ({ topHeight, leftWidth, transition }) => {
  // HACK: note that this is a bandaid solution to poor responsiveness
  // for the menu. A better solution less coupled with state is needed
  // SEE: Menu & Console components for parts 2 & 3 of bandaid
  topHeight = parseInt(leftWidth, 10) < 39 ? '0%' : topHeight
  return (
    <section
      className="sidebar--menu top-pane"
      style={{ height: topHeight, transition }}>
      <header className="sidebar--menu--header">
        Contents
      </header>
      <MenuMap
        header="Sorting Algorithms"
        items={SORTING_ALGOS} />
      <MenuMap
        header="Data Structures"
        items={DATA_STRUCTURES} />
      <details open>
        <summary className="sidebar--menu--sub-header">
          Algorithm Challenges
        </summary>
        <MenuMap
          header="Easy"
          items={EASY_ALGOS}
          xtraClass="sub" />
        <MenuMap
          header="Moderate"
          items={MODERATE_ALGOS}
          xtraClass="sub" />
      </details>
    </section>
  );
}

Menu.propTypes = {
  leftWidth: PropTypes.string.isRequired,
  topHeight: PropTypes.string.isRequired,
  transition: PropTypes.string.isRequired
}

const mapStateToProps = ({ panes }) => ({
  leftWidth: panes.leftWidth,
  topHeight: panes.topHeight,
  transition: panes.transition
});

export default connect(mapStateToProps)(Menu);
