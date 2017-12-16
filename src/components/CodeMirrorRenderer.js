import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import defaultOptions from '../utils/editorConfig';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { updateCode } from '../actions/editor';

// codemirror assets
import '../styles/codemirror.css'
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/selection/active-line';
import 'codemirror/theme/tomorrow-night-eighties.css';

import { JSHINT } from 'jshint';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/javascript-lint';
window.JSHINT = JSHINT;

class CodeMirrorRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFolded: false
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.snippet !== this.props.snippet) {
      this.props.updateCode(this.props.code, true);
    }
  }
  handleFold = (editor, data) => {
    if (!this.state.isFolded) {
      // fold/hide BST solution's helper code
      const { currentId, isSolution  } = this.props;
      const line_1 = (editor.getLine(1) === 'class QNode {');
      const line_9 = (editor.getLine(9) === 'class Queue {');
      if (currentId === 'BinarySearchTree' && isSolution && line_1 && line_9) {
        editor.foldCode(1);
        editor.foldCode(9);
        this.setState({ isFolded: true });
      }
    }
  }
  updateCode = (editor, data, value) => {
    this.props.updateCode(value, false);
  }
  render() {
    const options = this.props.welcome ? {
      ...defaultOptions,
      mode: 'markdown'
    } : defaultOptions;
    return (
      <CodeMirror
        onBeforeChange={this.updateCode}
        onChange={this.handleFold}
        options={options}
        value={this.props.code}
      />
    );
  }
}

CodeMirrorRenderer.propTypes = {
  code: PropTypes.string.isRequired,
  currentId: PropTypes.string.isRequired,
  isSolution: PropTypes.bool.isRequired,
  updateCode: PropTypes.func.isRequired,
  welcome: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    code: state.editor.current.code,
    currentId: state.editor.current.id,
    isSolution: state.editor.current.isSolution,
    welcome: state.editor.welcome
  }
}

export default connect(mapStateToProps, { updateCode })(CodeMirrorRenderer);
