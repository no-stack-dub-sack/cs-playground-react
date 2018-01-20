import CodeMirrorRenderer from './components/CodeMirrorRenderer';
import { connect } from 'react-redux';
import Console from './components/sidebar/Console';
import Controls from './components/Controls';
import Divider from './components/utils/Divider';
import { dragHorizontal, dragVertical, doubleClick } from './actions/panes';
import Menu from './components/sidebar/Menu';
import Modal from './components/utils/Modal';
import Pane from './components/utils/Pane';
import React, { Component } from 'react';
import { renderAnnouncementUtil } from './actions/modal';
import shortid from 'shortid';
import axios from 'axios';
import './styles/app.css';

/** NEW FEATURES:
  * Double click divider to hide contents or console pane
  * Preserve Pane State
  * Testing challenges
  * Fix clearCode() typo!
  * Improved various data structures
  * Improved clearState() - timeout
  * fixed codeStore bug
  * prevent text highlighting on divider drag
  * toggle solution shortcut keys
  */

// TODO: LODASH INRANGE PANES REDUCER CASE

// TODO: IMPORTANT - FIX MENU ITERATION... doubly linked list? / flatten CODE array

/** TODO:
  * add // SUPPRESS TESTS comment to all user code
  * CONSOLIDATE TESTS WITH MULTI-MESSAGING!!!
  * add arguments to methods to implement
  * add replacement util to update changed method names in user code (e.g. hasher to hash)
  * refactor data structure tests to use single test structure (like BST)
  * fix circular list edge cases:
      - remove from single-node list with remove or removeAt
      - no match for remove method, return null and don't decrement
  * any other LL fixes???
  * toggle SOLUTION/SEED!!! Shortcut key
  * add return null if element exists to all LL
  * fix JSDoc comments to true JSDoc style??
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
    document.addEventListener('mouseup', this.handleMouseupEvent);
    document.addEventListener('mousemove', this.handleMousemoveEvent);
    document.addEventListener('mousedown', this.handleMousedownEvent);
    // double-click event for snapping divider top or bottom
    this.horizontalDivider.addEventListener('dblclick', this.props.doubleClick);
    // apply simpleDrag to allow for AWESOME pane resizing:
    this.horizontalDivider.simpleDrag(dragVertical, null, 'vertical');
    this.verticalDivider.simpleDrag(dragHorizontal, null, 'horizontal');
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
    document.removeEventListener('mouseup', this.handleMouseupEvent);
    document.removeEventListener('mousedown', this.handleMousedownEvent);
    document.removeEventListener('mousemove', this.handleMousemoveEvent);
    this.horizontalDivider.removeEventListener('dblclick', this.props.doubleClick);
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
        <Console />
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

export default connect(null, { doubleClick })(App);

// export default connect(
//   ({ modal: { renderModal } }) => ({ renderModal }),
//   { doubleClick })
// (App);
