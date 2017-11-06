import React from 'react';
import MenuMap from './MenuMap';

import {
  SORTING_ALGOS_MENU,
  DATA_STRUCTURES_MENU,
  EASY_ALGOS_MENU,
  MODERATE_ALGOS_MENU
} from '../../assets/menu';

const Menu = ({ attachRef }) => {
  return (
    <section ref={attachRef} className="sidebar--menu top-pane">
      <header className="sidebar--menu--header">
        Contents
      </header>
      <MenuMap
        header="Sorting Algorithms"
        items={SORTING_ALGOS_MENU} />
      <MenuMap
        header="Data Structures"
        items={DATA_STRUCTURES_MENU} />
      <details open>
        <summary className="sidebar--menu--sub-header">
          Algorithm Challenges
        </summary>
        <MenuMap
          header="Easy"
          items={EASY_ALGOS_MENU}
          xtraClass="sub" />
        <MenuMap
          header="Moderate"
          items={MODERATE_ALGOS_MENU}
          xtraClass="sub" />
      </details>
    </section>
  );
};

export default Menu;
