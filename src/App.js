import CodeMirrorRenderer from './components/CodeMirrorRenderer'
import { connect } from 'react-redux'
import Console from './components/sidebar/Console'
import Controls from './components/Controls'
import Divider from './components/utils/Divider'
import { dragHorizontal, dragVertical, doubleClick } from './actions/panes'
import Menu from './components/sidebar/Menu'
import Modal from './components/utils/Modal'
import Pane from './components/utils/Pane'
import React, { Component } from 'react'
import { renderAnnouncementUtil } from './actions/modal'
import shortid from 'shortid'
import axios from 'axios'
import './styles/app.css'
import './styles/themes.css'

/** TODO BEFORE RELEASE:
  * Check that adding new challenges works (orderKey, shortcuts, etc.)
  * Create change/feature log
  * Add additional features to Modal
  */

/** NEW FEATURES:
  * Improved various data structures
  */

/** TODO:.
  * change modal message to something more appropriate -> create and point to "change log"
  * add return null if element exists to all LL
  *
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

class App extends Component {
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
    // render announcement modal 1st 3 visits after changes:
    renderAnnouncementUtil()
    // register hits to hit-count-server:
    if (process.env.NODE_ENV === 'production') {
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
          className="main right-pane"
          key={shortid.generate()}>
          <CodeMirrorRenderer />
          <Controls />
        </Pane>
        <Modal />
      </React.Fragment>
    )
  }
}

// NOTE: Modal is Portal rendered within #modal-root, not the app #root
// It WILL NOT be rendered alongside the other components in this tree

export default connect(null, { doubleClick })(App)

// export default connect(
//   ({ modal: { renderModal } }) => ({ renderModal }),
//   { doubleClick })
// (App)
