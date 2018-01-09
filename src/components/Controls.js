import { clearConsole } from '../actions/console';
import { connect } from 'react-redux';
import evalCode from '../utils/test/eval-code-run-tests';
import React, { Component } from 'react';
import { re_resetState, re_SUPPRESS_TESTS } from '../utils/regexp';
import PropTypes from 'prop-types';

import {
  nextSnippet,
  previousSnippet,
  resetEditorState
} from '../actions/editor';

import '../styles/controls.css';

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
    if (prevProps.codeSlice !== this.props.codeSlice) {
      this.setState({ clearConsole: true });
    }
  }
  handleKeyPress = (e) => {
    // Run Code: CMD/CTRL + ENTER
    if (e.ctrlKey && e.keyCode === 13 ||
        e.metaKey && e.keyCode === 13) {
      this.handleRunCode(this.props);
    }
    // Previous Snippet: CMD/CTRL + SHIFT + <
    if (e.ctrlKey && e.shiftKey && e.keyCode === 188 ||
        e.metaKey && e.shiftKey && e.keyCode === 188) {
      this.props.previousSnippet();
    }
    // Next Snippet: CMD/CTRL + SHIFT + >
    if (e.ctrlKey && e.shiftKey && e.keyCode === 190 ||
        e.metaKey && e.shiftKey && e.keyCode === 190) {
      this.props.nextSnippet();
    }
    // Clear Console: ALT + SHIFT + BACKSPACE
    if (e.altKey && e.shiftKey && e.keyCode === 8 ||
        e.altKey && e.shiftKey && e.keyCode === 8) {
      this.props.clearConsole();
    }
  }
  toggleClearConsole = () => {
    if (this.state.clearConsole) {
      this.props.clearConsole();
      this.setState({ clearConsole: false });
    }
  }
  clearConsoleResetCount = () => {
    this.setState({ resetCount: 0 });
    this.props.clearConsole();
  }
  handleResetSate = () => {
    if (this.state.resetCount === 0) {
      this.setState(state => ({ resetCount: state.resetCount+1 }));
      this.props.clearConsole();
      console.log(
        'WARNING: Are you sure you want to reset?\n' +
        'This action CANNOT be reversed, and all of\n' +
        'your solutions will be permanently deleted.\n' +
        "To proceed, hit the 'Run Code' button again."
      );
      // reset count after 15 seconds to prevent accidental resets
      setTimeout(() => {
        if (this.state.resetCount === 1) {
          this.clearConsoleResetCount();
          console.log('Global state reset timed out. Please try again.');
        }
      }, 15000);
    } else {
      this.props.resetEditorState();
      this.clearConsoleResetCount();
      console.log('State successfully reset!');
    }
  }
  handleRunCode = ({ code, id }) => {
    this.toggleClearConsole();
    if (re_resetState.test(code)) {
      this.handleResetSate();
    } else {
      // if last action was handleResetSate and the resetState() call
      // has been deleted reset resetCount to prevent accidental resets
      this.state.resetCount === 1 && this.clearConsoleResetCount();
      // run code && execute tests
      evalCode(
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
          onClick={() => this.handleRunCode(this.props)}
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

Controls.propTypes = {
  clearConsole: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  codeSlice: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  nextSnippet: PropTypes.func.isRequired,
  previousSnippet: PropTypes.func.isRequired,
  resetEditorState: PropTypes.func.isRequired,
}

const mapStateToProps = ({ editor: { current } }) => {
  return {
    code: current.code,
    codeSlice: current.code.slice(-20),
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
