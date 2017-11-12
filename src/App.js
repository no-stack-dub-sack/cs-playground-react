import CodeMirrorRenderer from './components/CodeMirrorRenderer';
import ConsoleOutput from './components/sidebar/ConsoleOutput';
import Controls from './components/Controls';
import Divider from './components/utils/Divider';
import Menu from './components/sidebar/Menu';
import Modal from './components/utils/Modal';
import React, { Component } from 'react';
import resizePanes from './utils/resize';
import shortid from 'shortid';
import './App.css';

class App extends Component {
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
        <CodeMirrorRenderer className="main--editor" />
        <Controls />
      </main>,
      <Modal key={shortid.generate()} />
    ];
  }
}

// NOTE: Modal is Portal rendered within #modal-root, not the app #root
// It WILL NOT be rendered alongside the other components in this tree

export default App;
