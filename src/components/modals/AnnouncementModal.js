import { RENDR_MODAL } from '../../utils/localStorageKeys'
import React from 'react'
import { map } from 'lodash'

const AnnouncementModal = (props) => (
  <div className="modal">
    <h2 className="modal--header">
      { props.header }
    </h2>
    <p>
      <strong dangerouslySetInnerHTML={{ __html: props.subHeader }} />
    </p>
    <ul>
      { map(props.messages, props.renderListItem) }
    </ul>
    <p>
      <strong dangerouslySetInnerHTML={{ __html:
          props.messages[props.messages.length-1]}} />
    </p>
    {(() => {
        let num = localStorage.getItem(RENDR_MODAL)
        num = num === '1' ? 2 : num === '2' ? 1 : 0
        return (
          <span>
            {`You will see this notification ${num} more time${num === 1 ? '' : 's'}`}
          </span>
        )
    })()}
  </div>
)

export default AnnouncementModal
