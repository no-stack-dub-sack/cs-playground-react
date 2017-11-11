import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  clearConsole,
  nextSnippet,
  previousSnippet
} from '../actions/editor';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clear: false
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
  runCode = () => {
    if (this.state.clear) {
      this.props.clearConsole();
      this.setState({ clear: false });
    }
    try {
      eval(this.props.code);
    } catch (error) {
      console.log('Whoops! Your code has an error.\nFix it and try again!');
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.slice !== this.props.slice) {
      this.setState({ clear: true });
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
    code: state.snippets.code,
    slice: state.snippets.code.slice(-20)
  }
};

const mapDispatchToProps = {
  clearConsole,
  nextSnippet,
  previousSnippet
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
