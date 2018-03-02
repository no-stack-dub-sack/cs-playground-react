import React from 'react'
import Transition from 'react-transition-group/Transition'

const BounceInBounceOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={700}
    onEnter={node => node.classList.add('bounceIn', 'animateToast')}
    onExit={node => {
      node.classList.remove('bounceIn', 'animateToast');
      node.classList.add('bounceOut', 'animateToast');
    }}>
    {children}
  </Transition>
)

export default BounceInBounceOut
