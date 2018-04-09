import './styles/app.css'
import './styles/themes/__index__.css'

import React, { Component } from 'react'
import { doubleClick, dragHorizontal, dragVertical } from './actions/panes'

import CodeMirrorRenderer from './components/CodeMirrorRenderer'
import Console from './components/sidebar/Console'
import Controls from './components/Controls'
import Divider from './components/utils/Divider'
import Menu from './components/sidebar/Menu'
import Modal from './components/Modal'
import Pane from './components/utils/Pane'
import axios from 'axios'
import { connect } from 'react-redux'
import { isMongoId } from 'validator'
import { loadRepl } from './actions/editor'
import { renderAnnouncementUtil } from './actions/modal'
import { toast } from 'react-toastify'

/** TODO:
  * POST UPDATE RELEASE:
      * add Menu Searh / Filter
      * switch to real JSDoc, provide Markdown docs
      * rework application structure, add most state to top level
      * find a way around below hack
  */

// HACK: For preventing text highlighting on mousemove when
// dragging dividers: setting this as a key in component state
// & manipulating via the mousedown event handler caused the
// component to throw an error about setting state on an unmounted
// component, even though the state is being set in the top level
// app and it must be mounted because it's still rendered to the
// DOM. Not sure why this is happening right now, but this hack
// is a workaround that I can live with for the time being.
let disableHighlightText = false

export const isProd = process.env.NODE_ENV === 'production'

export const apiURL = isProd
  ? 'https://cs-pg-react-api.herokuapp.com'
  : 'http://localhost:5000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentWillMount() {
    let URL = window.location.href
    if (URL.includes('share-repl')) {
      this.validateShareLink(URL)
    } else {
      renderAnnouncementUtil()
    }
  }
  validateShareLink = (URL) => {
    if (URL.endsWith('/')) URL = URL.slice(0, -1)
    const isShareLink = /share-repl\/\w{24}$/
    if (isShareLink.exec(URL)) {
      const shareLinkId = /\w{24}$/.exec(URL)[0]
      if (isMongoId(shareLinkId)) {
        this.setState({ loading: true })
        this.loadSharedRepl(shareLinkId)
      } else {
        console.log('Share link is not valid...')
      }
    } else {
      console.log('Share link is not valid...')
    }
  }
  loadSharedRepl = (shareLinkId) => {
    const api_key = process.env.REACT_APP_API_KEY
    axios.get(`${apiURL}/get-code/${api_key}/${shareLinkId}`)
      .then(({ data }) => {
        this.props.loadRepl(data.code)
        console.log(data.message)
        this.notify()
        this.setState({ loading: false })
      })
      .catch(e => {
        console.error(e)
        console.log('Error loading shared repl...')
        this.setState({ loading: false })
      })
  }
  notify = () => {
    toast.error(`
      WARNING: Progress made in this tab will not be saved
      to prevent accidental overwrites to local storage!`, {
      autoClose: false,
      closeOnClick: true
    })
  }
  componentDidMount() {
    // register event listeners:
    document.addEventListener('mouseup', this.handleMouseupEvent)
    document.addEventListener('mousemove', this.handleMousemoveEvent)
    document.addEventListener('mousedown', this.handleMousedownEvent)
    // double-click event for snapping divider top or bottom
    this.horizontalDivider.addEventListener('dblclick', this.props.doubleClick)
    // apply simpleDrag to allow for AWESOME pane resizing:
    this.horizontalDivider.simpleDrag(dragVertical, null, 'vertical')
    this.verticalDivider.simpleDrag(dragHorizontal, null, 'horizontal')
    // register hits to hit-count-server:
    if (isProd) {
      axios.post('https://hit-count-server.herokuapp.com/register-count')
      .then(() => null)
      .catch(() => null)
    }
  }
  componentWillUnmount() {
    // de-register event listeners:
    document.removeEventListener('mouseup', this.handleMouseupEvent)
    document.removeEventListener('mousedown', this.handleMousedownEvent)
    document.removeEventListener('mousemove', this.handleMousemoveEvent)
    this.horizontalDivider.removeEventListener('dblclick', this.props.doubleClick)
  }
  handleMousedownEvent = (e) => {
    if (e.target.classList.contains('divider')) {
      disableHighlightText = true
    }
  }
  handleMouseupEvent = (e) => {
    disableHighlightText = false
  }
  handleMousemoveEvent = (e) => {
    if (disableHighlightText) {
      e.preventDefault()
    }
  }
  render() {
    return (
      <React.Fragment>
        <Pane
          className="sidebar left-pane">
          <Menu />
          <Divider
            attachRef={ref => this.horizontalDivider = ref}
            direction="horizontal" />
          <Console />
        </Pane>
        <Divider
          attachRef={ref => this.verticalDivider = ref}
          direction="vertical" />
        <Pane
          className="main right-pane">
          <CodeMirrorRenderer loading={this.state.loading} />
          <Controls />
        </Pane>
        <Modal />
      </React.Fragment>
    )
  }
}

// NOTE: Modal is Portal rendered within #modal-root, not the app #root
// It WILL NOT be rendered alongside the other components in this tree

export default connect(null, { doubleClick, loadRepl })(App)

// NOTE: eventually report apparent bug with connecting app.js
// export default connect(
//   ({ modal: { renderModal } }) => ({ renderModal }),
//   { doubleClick })
// (App)
