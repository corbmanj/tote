import React from 'react'
import PropTypes from 'prop-types'

export default function Modal(props) {
  const { children, closeModal, confirmAction, modalProps, headerText, renderActions } = props
  
  function renderModalActions() {
    return (
      <div className="modal-actions">
        <button
          onClick={closeModal}
          data-test-id="reset-modal-cancel-button"
          className="button red cancel-modal"
        >Cancel
        </button>
        <button
          onClick={confirmAction}
          data-test-id="reset-modal-confirm-button"
          className="button"
        >{modalProps.confirmText}
        </button>
      </div>
    )
  }
  return (
    <div className="modal-background">
      <div className="modal-container modal-alert">
        <div className="modal-close" onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="19.82 5.59 18.41 4.18 12 10.59 5.59 4.18 4.18 5.59 10.59 12 4.18 18.41 5.59 19.82 12 13.41 18.41 19.82 19.82 18.41 13.41 12 19.82 5.59"></polygon>
          </svg>
        </div>
        <div className="modal-header">
          <span>{headerText}</span>
        </div>
        <div className="modal-body modal-body-with-header">
          {children}
        </div>
        {renderActions ? renderModalActions() : null}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.element,
  closeModal: PropTypes.func,
  confirmAction: PropTypes.func,
  modalProps: PropTypes.shape({
    confirmText: PropTypes.string,
  }),
  headerText: PropTypes.string,
  renderActions: PropTypes.bool,
}