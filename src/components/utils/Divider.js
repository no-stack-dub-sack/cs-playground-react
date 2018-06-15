// @flow
import PropTypes from 'prop-types';
import React from 'react';
import { HORIZONTAL_GRIP, VERTICAL_GRIP } from '../../utils/base64';

const Divider = ({ attachRef, direction }: { attachRef: Function, direction: string }) => {
  return (
    <div
      style={{
        backgroundImage: direction === 'horizontal'
          ? HORIZONTAL_GRIP
          : VERTICAL_GRIP
      }}
      ref={attachRef}
      className={`${direction} divider`}
    />
  )
}

Divider.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  attachRef: PropTypes.func.isRequired
}

export default Divider
