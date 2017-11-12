import PropTypes from 'prop-types';
import React from 'react';

const Divider = ({ attachRef, direction }) => {
  return (
    <div
      ref={attachRef}
      className={`${direction} divider`}
    />
  );
};

Divider.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  attachRef: PropTypes.func.isRequired
};

export default Divider;
