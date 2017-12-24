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

// TODO: Figure out how to disable highlight text on mousemove
// had this so far:
// prevent text highlighting when resizing panes
// document.addEventListener('mousedown', this.handleMouseDownEvent);
// document.addEventListener('mouseup', this.handleMouseUpEvent);
// document.addEventListener('mousemove', this.handleMouseMoveEvent);
// componentWillUnmount() {
  // document.removeEventListener('mousedown', this.handleMouseDownEvent);
  // document.removeEventListener('mouseup', this.handleMouseUpEvent);
  // document.removeEventListener('mousemove', this.handleMouseMoveEvent);
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableHighlightText: false
    }
  }
  handleMouseDownEvent = (e) => {
    if (e.target.classList.contains('divider')) {
        this.setState({ disableHighlightText: true });
    }
  }
  handleMouseUpEvent = (e) => {
    this.setState({ disableHighlightText: false });
  }
  handldeMouseMoveEvent = (e) => {
    if (this.state.disableHighlightText) {
      e.preventDefault();
    }
  }
  componentDidMount() {
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
