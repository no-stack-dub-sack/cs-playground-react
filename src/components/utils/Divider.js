import PropTypes from 'prop-types'
import React from 'react'
import { VERTICAL_GRIP, HORIZONTAL_GRIP } from '../../utils/base64'

const Divider = ({ attachRef, direction }) => {
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
