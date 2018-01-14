import * as π from './utils/styleListeners';
import CodeMirrorRenderer from './components/CodeMirrorRenderer';
import ConsoleOutput from './components/sidebar/ConsoleOutput';
import Controls from './components/Controls';
import Divider from './components/utils/Divider';
import { dragHorizontal, dragVertical } from './actions/drag';
import { HORIZONTAL_GRIP, VERTICAL_GRIP } from './utils/base64';
import Menu from './components/sidebar/Menu';
import Modal from './components/utils/Modal';
import Pane from './components/Pane';
import React, { Component } from 'react';
import { renderAnnouncementUtil } from './actions/modal';
import shortid from 'shortid';
import axios from 'axios';
import './styles/app.css';

/** TODO:
  * add // SUPPRESS TESTS comment to all user code
  * fix circular list edge cases:
      - remove from single-node list with remove or removeAt
      - no match for remove method, return null and don't decrement
  * any other LL fixes???
  * toggle SOLUTION/SEED!!! Shortcut key
  * add return null if element exists to all LL
  * fix JSDoc comments to true JSDoc style??
  * add pane positions to redux state????
  * rework application structure, add most state to top level
  * refactor modal into separate components: announcement, resources
  * find a way around below hack
  */

// HACK: For preventing text highlighting on mousemove when
// dragging dividers: setting this as a key in component state
// & manipulating via the mousedown event handler caused the
// component to throw an error about setting state on an unmounted
// component, even though the state is being set in the top level
// app and it must be mounted because it's still rendered to the
// DOM. Not sure why this is happening right now, but this hack
// is a workaround that I can live with for the time being.
let disableHighlightText = false;

class App extends Component {
  constructor(props) {
    super(props);
    π.documentBodyClick = π.documentBodyClick.bind(this);
  }
  handleMousedownEvent = (e) => {
    if (e.target.classList.contains('divider')) {
      disableHighlightText = true;
    }
  }
  handleMouseupEvent = (e) => {
    disableHighlightText = false;
  }
  handleMousemoveEvent = (e) => {
    if (disableHighlightText) {
      e.preventDefault();
    }
  }
  componentDidMount() {
    // register event listeners:
    document.addEventListener('mouseup', π.documentBodyClick);
    document.addEventListener('mouseup', this.handleMouseupEvent);
    document.addEventListener('mousemove', this.handleMousemoveEvent);
    document.addEventListener('mousedown', this.handleMousedownEvent);
    this.verticalDivider.addEventListener('mousedown', π.verticalDivClick);
    this.horizontalDivider.addEventListener('mousedown', π.horizontalDivClick);
    // apply simpleDrag to allow for AWESOME pane resizing:
    this.horizontalDivider.simpleDrag(dragVertical, null, 'vertical');
    this.verticalDivider.simpleDrag(dragHorizontal, null, 'horizontal');
    // initialize divider grips:
    this.verticalDivider.style.backgroundImage = VERTICAL_GRIP;
    this.horizontalDivider.style.backgroundImage = HORIZONTAL_GRIP;
    // render announcement modal 1st 3 visits after changes:
    renderAnnouncementUtil();
    // register hits to hit-count-server:
    if (process.env.NODE_ENV === 'production') {
      axios.post('https://hit-count-server.herokuapp.com/register-count')
      .then(() => null)
      .catch(() => null);
    }
  }
  componentWillUnmount() {
    // de-register event listeners:
    document.removeEventListener('mouseup', π.documentBodyClick);
    document.removeEventListener('mouseup', this.handleMouseupEvent);
    document.removeEventListener('mousedown', this.handleMousedownEvent);
    document.removeEventListener('mousemove', this.handleMousemoveEvent);
    this.verticalDivider.removeEventListener('mousedown', π.verticalDivClick);
    this.horizontalDivider.removeEventListener('mousedown', π.horizontalDivClick);
  }
  render() {
    return [
      <Pane
        className="sidebar left-pane"
        key={shortid.generate()}>
        <Menu />
        <Divider
          attachRef={ref => this.horizontalDivider = ref}
          direction="horizontal" />
        <ConsoleOutput />
      </Pane>,
      <Divider
        attachRef={ref => this.verticalDivider = ref}
        direction="vertical"
        key={shortid.generate()} />,
      <Pane
        className="main right-pane"
        key={shortid.generate()}>
        <CodeMirrorRenderer />
        <Controls />
      </Pane>,
      <Modal key={shortid.generate()} />
    ];
  }
}

// NOTE: Modal is Portal rendered within #modal-root, not the app #root
// It WILL NOT be rendered alongside the other components in this tree

export default App;
