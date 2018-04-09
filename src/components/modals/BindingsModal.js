import React from 'react'

const BindingsModal = (props) => (
  <div className="modal">
    <h2 className="modal--header">
      { props.header }
    </h2>
    <div dangerouslySetInnerHTML={{ __html: props.messages }} />
  </div>
)

export default BindingsModal
