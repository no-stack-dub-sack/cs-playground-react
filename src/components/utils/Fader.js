import React from 'react'
import { Transition } from 'react-transition-group'

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
}

const Fade = ({ in: inProp, children, attachRef, duration }) => {
  const defaultStyle = {
    transition: `opacity ${duration.exit ? duration.exit : duration}ms ease-out`,
    opacity: 0
  }
  return (
    <Transition in={inProp} timeout={duration} unmountOnExit={true}>
      {(state) => (
        <div ref={attachRef} style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          {children}
        </div>
      )}
    </Transition>
  )
}

export default Fade
