import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Quicksort from '../assets/seed/algorithms/Quicksort';
import { updateCode } from '../actions/editor';
import options from '../utils/editorConfig';

// codemirror assets
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/selection/active-line';
import 'codemirror/theme/tomorrow-night-eighties.css';

class CodeMirrorRenderer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.snippet !== this.props.snippet) {
      this.props.updateCode(this.props.code, true);
    }
  }
  handleChange = (editor, d) => {
    if (this.props.currentId === 'BinarySearchTree' && this.props.isSolution) {
      editor.foldCode(1);
      editor.foldCode(9);
    }
  }
  updateCode = (e, d, value) => {
    this.props.updateCode(value, false);
  }
  render() {
    return (
      <CodeMirror
        onBeforeChange={this.updateCode}
        onChange={this.handleChange}
        options={options}
        value={this.props.code}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    code: state.code.code,
    currentId: state.code.id,
    isSolution: state.code.isSolution
  }
}

export default connect(mapStateToProps, { updateCode })(CodeMirrorRenderer);
