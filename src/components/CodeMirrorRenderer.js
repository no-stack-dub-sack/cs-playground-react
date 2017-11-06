import React, { Component } from 'react';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';
import Quicksort from '../assets/seed/algorithms/Quicksort';
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

const options = {
  mode:  "javascript",
  indentUnit: 4,
  foldGutter: true,
  lineNumbers: true,
  matchBrackets: true,
  styleActiveLine: true,
  autoCloseBrackets: true,
  theme: 'tomorrow-night-eighties',
  keyMap: 'sublime',
  gutters: [
    'CodeMirror-linenumbers',
    'CodeMirror-foldgutter'
  ]
};

class CodeMirrorRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: Quicksort
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.setState({ code: this.props.code }, () => {
        const codemirror = this.CodeMirror.getCodeMirror();
        codemirror.setValue(this.state.code);
      });
    }
  }
  updateCode = (newCode) => {
    this.setState({ code: newCode });
  }
  render() {
    return (
      <CodeMirror
        ref={ref => this.CodeMirror = ref }
        options={options}
        value={this.state.code}
        onChange={this.updateCode}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    code: state.snippets.code
  }
}

export default connect(mapStateToProps)(CodeMirrorRenderer);
