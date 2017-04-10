import React from 'react'

export Default const Modal = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    confirmAction: React.PropTypes.func,
    confirmText: React.PropTypes.string,
    closeModal: React.PropTypes.func
  },

  render () {
    return (
      <div className="modal-background">
        <div className="modal-container modal-alert" onClick={this.handleClickOffModal}>
          <div className="modal-close" onClick={this.closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <polygon points="19.82 5.59 18.41 4.18 12 10.59 5.59 4.18 4.18 5.59 10.59 12 4.18 18.41 5.59 19.82 12 13.41 18.41 19.82 19.82 18.41 13.41 12 19.82 5.59"></polygon>
            </svg>
          </div>
          <div className="modal-header">
            <h4>{this.props.title}</h4>
          </div>
          <div className="modal-body modal-body-with-header">
            {this.props.message}
          </div>
          <div className="modal-actions">
            <a
              href="#"
              onClick={this.closeModal}
              data-test-id="reset-modal-cancel-button"
              className="cdl-button primary"
            >{dStrings.cancel}
            </a>
            <a
              href="#"
              onClick={this.handleConfirmClick}
              data-test-id="reset-modal-reset-button"
              className="cdl-button secondary"
            >{this.props.confirmText}
            </a>
          </div>
        </div>
      </div>
    )
  }
})