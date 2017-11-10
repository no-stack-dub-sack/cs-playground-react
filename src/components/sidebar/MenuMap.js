import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectSnippet, selectSolution } from '../../actions/editor';
import shortid from 'shortid';

class MenuMap extends Component {
  selectSeed = (e) => {
    e.stopPropagation();
    this.props.selectSnippet(e.target.id);
  }
  selectSolution = (e) => {
    e.stopPropagation();
    this.props.selectSolution(e.target.id);
  }
  renderItem = (item, i) => (
    <div
      className={`sidebar--menu--detail ${ this.props.xtraClass }`}
      id={item.title.replace(/\s/g, '')}
      key={shortid.generate()}
      onClick={this.selectSeed}>
      <span>
        {item.title}
      </span>
      { !/Benchmarks/.test(item.title) &&
      <div className="sidebar--menu--detail--button--container">
        <span
          className="sidebar--menu--detail--button solution"
          id={`__${ item.title.replace(/\s/g, '') }`}
          onClick={this.selectSolution}>
          Solution
        </span>
        <span className="sidebar--menu--detail--button resources">
          Resources
        </span>
      </div> }
    </div>
  )
  render() {
    return (
      <details open>
        <summary className="sidebar--menu--sub-header">
          {this.props.header}
        </summary>
        {this.props.items.map(this.renderItem)}
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

export default connect(null, { selectSnippet, selectSolution })(MenuMap);
