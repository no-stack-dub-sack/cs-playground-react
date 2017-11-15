import { clearConsole } from '../actions/console';
import { connect } from 'react-redux';
import { nextSnippet, previousSnippet, resetEditorState } from '../actions/editor';
import React, { Component } from 'react';
import '../styles/controls.css';
import { store } from '../index';

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
  handleKeyPress = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.runCode();
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
  runCode = () => {
    this.toggleClearConsole();
    if (/resetState\(\)/.test(this.props.code)) {
      this.handleResetSate();
    } else {
      try {
        // eslint-disable-next-line
        eval(this.props.code);
      } catch (error) {
        console.log('Whoops! Your code has an error.\nFix it and try again!');
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.slice !== this.props.slice) {
      this.setState({ clearConsole: true });
    }
  }
  render() {
    return (
      <section className="main--controls">
        <button
          onClick={this.runCode}
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

const mapStateToProps = (state) => {
  return {
    code: state.editor.current.code,
    slice: state.editor.current.code.slice(-20)
  }
};

const mapDispatchToProps = {
  clearConsole,
  nextSnippet,
  previousSnippet,
  resetEditorState
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
