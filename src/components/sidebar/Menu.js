import React from 'react';
import MenuMap from './MenuMap';
import PropTypes from 'prop-types';
import { CODE } from '../../assets/codeRef';

const {
  SORTING_ALGOS,
  DATA_STRUCTURES,
  EASY_ALGOS,
  MODERATE_ALGOS
} = CODE;

const Menu = ({ attachRef }) => {
  return (
    <section ref={attachRef} className="sidebar--menu top-pane">
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
};

Menu.propTypes = {
  attachRef: PropTypes.func.isRequired
};

export default Menu;
