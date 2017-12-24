import CodeMirrorRenderer from './components/CodeMirrorRenderer';
import ConsoleOutput from './components/sidebar/ConsoleOutput';
import Controls from './components/Controls';
import Divider from './components/utils/Divider';
import Menu from './components/sidebar/Menu';
import Modal from './components/utils/Modal';
import React, { Component } from 'react';
import resizePanes from './utils/resize';
import shortid from 'shortid';
import axios from 'axios';
import './styles/app.css';

// TODO: find a way around below hack

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
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMousedownEvent);
    document.removeEventListener('mouseup', this.handleMouseupEvent);
    document.removeEventListener('mousemove', this.handleMousemoveEvent);
  }
  componentDidMount() {
    // prevent text highlighting when resizing panes
    document.addEventListener('mousedown', this.handleMousedownEvent);
    document.addEventListener('mouseup', this.handleMouseupEvent);
    document.addEventListener('mousemove', this.handleMousemoveEvent);
    // pass refs to simple drag function
    // to allow for AWESOME pane resizing
    resizePanes(
      this.leftPane,
      this.topPane,
      this.rightPane,
      this.bottomPane,
      this.verticalDivider,
      this.horizontalDivider
    );
    // count hits to live site using node server
    if (process.env.NODE_ENV === 'production') {
      axios.post('https://hit-count-server.herokuapp.com/register-count')
      .then(() => null)
      .catch(() => null);
    }
  }
  render() {
    return [
      <aside
        className="sidebar left-pane"
        key={shortid.generate()}
        ref={ref => this.leftPane = ref }>
        <Menu attachRef={ref => this.topPane = ref } />
        <Divider
          attachRef={ref => this.horizontalDivider = ref }
          direction="horizontal" />
        <ConsoleOutput attachRef={ ref => this.bottomPane = ref } />
      </aside>,
      <Divider
        attachRef={ref => this.verticalDivider = ref }
        direction="vertical"
        key={shortid.generate()} />,
      <main
        className="main right-pane"
        key={shortid.generate()}
        ref={ref => this.rightPane = ref }>
        <CodeMirrorRenderer />
        <Controls />
      </main>,
      <Modal key={shortid.generate()} />
    ];
  }
}

// NOTE: Modal is Portal rendered within #modal-root, not the app #root
// It WILL NOT be rendered alongside the other components in this tree

export default App;
