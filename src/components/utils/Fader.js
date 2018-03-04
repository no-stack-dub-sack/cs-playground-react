// @flow
import { Transition } from 'react-transition-group'
import * as React from 'react'

const transitionStyles: { [string]: Object } = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
}

type Props = {
  in: boolean,
  children: React.Node,
  attachRef: Function,
  duration: number | { enter: number, exit: number }
}

const Fade = ({ in: inProp, children, attachRef, duration }: Props) => {
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
