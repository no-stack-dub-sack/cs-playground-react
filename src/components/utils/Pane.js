import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

const Pane = ({
  children,
  className,
  leftWidth,
  rightWidth,
  transition
}) => (
  <main
    className={className}
    style={{ width: className.includes('left-pane')
      ? leftWidth
      : rightWidth }}>
    { children }
  </main>
);

Pane.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  leftWidth: PropTypes.string.isRequired,
  rightWidth: PropTypes.string.isRequired
}

const mapStateToProps = ({ panes }) => ({
  leftWidth: panes.leftWidth,
  rightWidth: panes.rightWidth,
});

export default connect(mapStateToProps)(Pane);
