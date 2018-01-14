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

const Menu = ({ topHeight }) => {
  return (
    <section
      className="sidebar--menu top-pane"
      style={{ height: topHeight }}>
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
  topHeight: PropTypes.string.isRequired
};

export default connect(
  ({ panes }) => ({topHeight: panes.topHeight})
)(Menu);
