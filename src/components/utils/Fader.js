import React from 'react';
import { Transition } from 'react-transition-group'

const duration = 450;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
}

const Fade = ({ in: inProp, children, attachRef }) => (
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
);

export default Fade;
