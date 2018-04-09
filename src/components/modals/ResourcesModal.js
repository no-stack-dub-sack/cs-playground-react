import React from 'react'
import { map } from 'lodash-es'

const ResourcesModal = (props) => (
  <div className="modal">
    <h2 className="modal--header">
      { props.header }
    </h2>
    <ul>
      { map(props.messages, props.renderListItem) }
    </ul>
  </div>
)

export default ResourcesModal
