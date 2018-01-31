import { connect } from 'react-redux'
import { Controlled as CodeMirror } from 'react-codemirror2'
import defaultOptions from '../utils/editorConfig'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { updateCode } from '../actions/editor'
import { nextTheme, prevTheme } from '../actions/theme'
import { closeModal, openThemeModal } from '../actions/modal'

// codemirror assets
import '../styles/codemirror.css'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/selection/active-line'
import 'codemirror/keymap/sublime'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/theme/abcdef.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/icecoder.css'
import 'codemirror/theme/lesser-dark.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/neat.css'
import 'codemirror/theme/panda-syntax.css'
import 'codemirror/theme/paraiso-light.css'
import 'codemirror/theme/tomorrow-night-eighties.css'
import 'codemirror/theme/twilight.css'

import { JSHINT } from 'jshint'
window.JSHINT = JSHINT

let timeout = null

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
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 221) {
      this.props.nextTheme()
      if (timeout) clearTimeout(timeout)
      this.props.openThemeModal(this.props.theme)
      timeout = setTimeout(() => this.props.closeModal(), 1000)
    }
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.keyCode === 219) {
      this.props.prevTheme()
      if (timeout) clearTimeout(timeout)
      this.props.openThemeModal(this.props.theme)
      timeout = setTimeout(() => this.props.closeModal(), 1000)
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
      mode: 'markdown',
      theme: this.props.theme
    } : {
      ...defaultOptions,
      theme: this.props.theme
    }
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
  theme: PropTypes.string.isRequired,
  welcome: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    code: state.editor.current.code,
    currentId: state.editor.current.id,
    isSolution: state.editor.current.isSolution,
    theme: state.theme.current,
    welcome: state.editor.welcome
  }
}

const mapDispatchToProps = {
  closeModal,
  nextTheme,
  openThemeModal,
  prevTheme,
  updateCode
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeMirrorRenderer)
