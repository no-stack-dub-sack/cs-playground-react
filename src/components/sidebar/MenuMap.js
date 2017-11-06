import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MenuMap extends Component {
  handleClick = ({ target: { id } }) => {
    this.props.selectSnippet(id);
  }
  renderItem = (item, i) => (
    <p
      className={`sidebar--menu--detail ${ this.props.xtraClass }`}
      id={ item.replace(/\s/g, '') }
      key={ `${ i }_${ item }` }
      onClick={ this.handleClick }>
      {item}
    </p>
  )
  render() {
    return (
      <details open>
        <summary className="sidebar--menu--sub-header">
          { this.props.header }
        </summary>
        { this.props.items.map(this.renderItem) }
      </details>
    );
  }
};

MenuMap.propTypes = {
  header: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  xtraClass: PropTypes.string
};

MenuMap.defaultProps = {
  xtraClass: ''
};

const selectSnippet = (id) => {
  return {
    type: 'SELECT_SNIPPET',
    id
  }
};

export default connect(null, { selectSnippet })(MenuMap);
