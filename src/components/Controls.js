import { clearConsole } from '../actions/console';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { re_resetState, re_SUPPRESS_TESTS } from '../utils/regexp';
import testRunner from '../utils/test/test-runner';

import '../styles/controls.css';

import {
  nextSnippet,
  previousSnippet,
  resetEditorState
} from '../actions/editor';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearConsole: false,
      resetCount: 0
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.slice !== this.props.slice) {
      this.setState({ clearConsole: true });
    }
  }
  handleKeyPress = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.runCode(this.props);
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 188) {
      this.props.previousSnippet();
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 190) {
      this.props.nextSnippet();
    }
  }
  toggleClearConsole = () => {
    if (this.state.clearConsole) {
      this.props.clearConsole();
      this.setState({ clearConsole: false });
    }
  }
  handleResetSate = () => {
    if (this.state.resetCount === 0) {
      this.setState(state => ({ resetCount: state.resetCount+1 }));
      console.log(
        'WARNING: Are you sure you want to reset?\n' +
        'This action CANNOT be reversed, and all of\n' +
        'your solutions will be permanently deleted.\n' +
        "To proceed, hit the 'Run Code' button again."
       );
    } else {
      this.props.resetEditorState();
      this.props.clearConsole();
      this.setState({ resetCount: 0 });
      console.log('State successfully reset!');
    }
  }
  runCode = ({ code, id }) => {
    this.toggleClearConsole();
    if (re_resetState.test(code)) {
      this.handleResetSate();
    } else {
      testRunner(
        code,
        id,
        re_SUPPRESS_TESTS.test(code)
      );
    }
  }
  render() {
    return (
      <section className="main--controls">
        <button
          onClick={() => this.runCode(this.props)}
          className="main--controls--button run-code"
          title="Ctrl + Enter">
          Run Code
        </button>
        <button
          onClick={this.props.previousSnippet}
          className="main--controls--button previous"
          title="Ctrl + Shift + <">
          Previous
        </button>
        <button
          onClick={this.props.nextSnippet}
          className="main--controls--button next"
          title="Ctrl + Shift + >">
          Next
        </button>
      </section>
    );
  }
};

const mapStateToProps = ({ editor: { current } }) => {
  return {
    code: current.code,
    slice: current.code.slice(-20),
    id: current.id
  }
}

const mapDispatchToProps = {
  clearConsole,
  nextSnippet,
  previousSnippet,
  resetEditorState
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
