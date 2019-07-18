import React from 'react'
import moment from 'moment'

export default function ConfirmModal (props) {
  function handleConfirmClick () {
    props.confirmAction(props.trip.tripId)
  }

  return (
    <div className="modal-background">
      <div className="modal-container modal-alert">
        <div className="modal-close" onClick={props.closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <polygon points="19.82 5.59 18.41 4.18 12 10.59 5.59 4.18 4.18 5.59 10.59 12 4.18 18.41 5.59 19.82 12 13.41 18.41 19.82 19.82 18.41 13.41 12 19.82 5.59"></polygon>
          </svg>
        </div>
        <div className="modal-header">
          <span>Are you sure you want to delete this trip?</span>
        </div>
        <div className="modal-body modal-body-with-header">
          <p>City: {props.trip.city}</p>
          <p>Start: {moment(props.trip.startDate).format('dddd, MMMM Do')}</p>
          <p>End: {moment(props.trip.endDate).format('dddd, MMMM Do')}</p>
        </div>
        <div className="modal-actions">
          <button
            onClick={props.closeModal}
            data-test-id="reset-modal-cancel-button"
            className="button red cancel-modal"
          >Cancel
          </button>
          <button
            onClick={handleConfirmClick}
            data-test-id="reset-modal-confirm-button"
            className="button"
          >Delete
          </button>
        </div>
      </div>
    </div>
  )
}