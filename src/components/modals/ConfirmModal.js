import React from 'react'
import { replace } from 'lodash-es'

const ConfirmModal = ({ closeModal, deleteRepl, id, theme }) => (
  <div className="modal">
    <h2 className="modal--header">
      { `Are you sure you want to delete the "${replace(id, /_/g, ' ')}" repl?` }
    </h2>
    <div className="modal--confirm-buttons">
      <div
        className={`modal--confirm--yes ${theme}`}
        id={'DELETE__' + replace(id, /\s/g, '_')}
        onClick={deleteRepl}>
        Yes
      </div>
      <div
        className={`modal--confirm--no ${theme}`}
        onClick={closeModal}>
        No
      </div>
    </div>
  </div>
)

export default ConfirmModal
