import React, { Component } from 'react';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';
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
  constructor(props) {
    super(props);
    this.state = {
      snippet: this.props.snippet
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.snippet !== this.props.snippet) {
      this.setState({ snippet: this.props.snippet }, () => {
        const codemirror = this.CodeMirror.getCodeMirror();
        codemirror.setValue(this.state.snippet);
        this.props.updateCode(this.state.snippet, true);
      });
    }
  }
  updateCode = (newCode) => {
    this.setState({ snippet: newCode }, () => {
      this.props.updateCode(this.state.snippet, false);
    });
  }
  render() {
    return (
      <CodeMirror
        ref={ref => this.CodeMirror = ref }
        options={options}
        value={this.state.snippet}
        onChange={this.updateCode}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    snippet: state.snippets.code
  }
}

export default connect(mapStateToProps, { updateCode })(CodeMirrorRenderer);
