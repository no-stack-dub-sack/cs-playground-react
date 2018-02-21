import _ from 'lodash'
import { connect } from 'react-redux'
import { selectChallenge, addRepl } from '../../actions/editor'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shortid from 'shortid'
import { PlusSquare } from 'react-feather'

_.mixin({
  'pascalCase': _.flow(
    _.camelCase,
    _.upperFirst
  )
})

class ReplsMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  handleChange = ({ target: { value } }) => {
    this.setState({ value })
  }
  handleAddRepl = (e) => {
    e.preventDefault()
    this.props.addRepl(_.snakeCase(this.state.value))
    this.setState({ value: '' })
  }
  selectChallenge = ({ currentTarget: { id }}) => {
    this.props.selectChallenge(id)
  }
  renderMenuItem = (item) => {
    const id = _.snakeCase(item)
    let itemClasses = id === this.props.codeId ? 'active ' : ''
    itemClasses += this.props.theme
    return (
      <div
        className={`sidebar--menu--detail ${itemClasses}`}
        id={id}
        key={shortid.generate()}
        onClick={this.selectChallenge}>
        <span>
          {_.startCase(item)}
        </span>
      </div>
    )
  }
  render() {
    return (
      <details open>
        <summary className={`sidebar--menu--sub-header ${this.props.theme}`}>
          Repls
        </summary>
        { _.map(this.props.repls, this.renderMenuItem) }
        <div className={`sidebar--menu--detail ${this.props.theme}`}>
          <PlusSquare
            className={`sidebar--menu--input-icon ${this.props.theme}`}
            onClick={() => this.input.focus()} />
          <form onSubmit={this.handleAddRepl}>
            {/* Error handling? No dupe IDs */}
            <input
              value={this.state.value}
              onChange={this.handleChange}
              ref={ref => this.input = ref}
              type="text" />
          </form>
        </div>
      </details>
    )
  }
}

ReplsMap.propTypes = {
  addRepl: PropTypes.func.isRequired,
  codeId: PropTypes.string.isRequired,
  repls: PropTypes.array.isRequired,
  selectChallenge: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}

const mapStateToProps = ({ editor, theme }) => ({
  codeId: editor.current.id,
  theme: theme.current,
  repls: editor.orderKey.slice(editor.orderKey.indexOf('free_code'))
})

export default connect(mapStateToProps, { addRepl, selectChallenge })(ReplsMap)
