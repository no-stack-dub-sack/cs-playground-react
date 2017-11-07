import React, { Component } from 'react';
import resizePanes from './utils/resize';
import shortid from 'shortid';
import './App.css';

import Menu from './components/sidebar/Menu';
import Controls from './components/Controls';
import Divider from './components/utils/Divider';
import ConsoleOutput from './components/sidebar/ConsoleOutput';
import CodeMirrorRenderer from './components/CodeMirrorRenderer';

class App extends Component {
  componentDidMount() {
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
      </main>
    ];
  }
}

export default App;
