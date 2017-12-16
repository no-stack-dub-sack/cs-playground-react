import { connect } from 'react-redux'
import { Controlled as CodeMirror } from 'react-codemirror2'
import defaultOptions from '../utils/editorConfig'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { updateCode } from '../actions/editor'

// codemirror assets
import '../styles/codemirror.css'
import 'codemirror/keymap/sublime'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/theme/tomorrow-night-eighties.css'

import { JSHINT } from 'jshint'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/javascript-lint'
window.JSHINT = JSHINT

class CodeMirrorRenderer extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }
  handleKeyPress = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 220) {
      this.editor.focus()
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.snippet !== this.props.snippet) {
      this.props.updateCode(this.props.code, true)
    }
  }
  updateCode = (editor, data, value) => {
    this.props.updateCode(value, false)
  }
  assignEditor = (editor) => {
    this.editor = editor
  }
  render() {
    const options = this.props.welcome ? {
      ...defaultOptions,
      mode: 'markdown'
    } : defaultOptions
    return (
      <CodeMirror
        editorDidMount={this.assignEditor}
        onBeforeChange={this.updateCode}
        options={options}
        value={this.props.code}
      />
    )
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

export default connect(mapStateToProps, { updateCode })(CodeMirrorRenderer)
