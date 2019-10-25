import React, {Component} from 'react'
import NamedItems from './NamedItems'
import CopyOutfit from './CopyOutfit'

export default class Modal extends Component {
  componentWillMount () {
    switch (this.props.contentType) {
      case 'NamedItems':
        this.setState({
          body:
            (<NamedItems
            updateNamedItemInAllOutfits={this.props.updateNamedItemInAllOutfits}
            deleteNamedItem={this.props.deleteNamedItem}
          />),
          headerText: 'Double click an item to edit',
          renderActions: false
      })
        break
      case 'CopyOutfit':
        const copyArray = this.props.modalProps.days.map(() => false)
        const updateCopyArray = (index, value) => {
          copyArray[index] = value
          this.setState({copyArray: copyArray})
        }
        const confirmAction = () => {
          this.props.confirmAction(this.state.copyArray, this.props.modalProps.outfit)
        }
        this.setState({
          body:
            <CopyOutfit
              days={this.props.modalProps.days}
              updateCopyArray={updateCopyArray}
            />,
          headerText: 'Choose the days you would like to copy to',
          copyArray: copyArray,
          renderActions: true,
          confirmAction
        })
        break
      default:
        break
    }
  }
  renderModalActions = () => {
    return (
      <div className="modal-actions">
        <button
          onClick={this.props.closeModal}
          data-test-id="reset-modal-cancel-button"
          className="button red cancel-modal"
        >Cancel
        </button>
        <button
          onClick={this.state.confirmAction}
          data-test-id="reset-modal-confirm-button"
          className="button"
        >{this.props.modalProps.confirmText}
        </button>
      </div>
    )
  }
  render () {
    return (
      <div className="modal-background">
        <div className="modal-container modal-alert">
          <div className="modal-close" onClick={this.props.closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <polygon points="19.82 5.59 18.41 4.18 12 10.59 5.59 4.18 4.18 5.59 10.59 12 4.18 18.41 5.59 19.82 12 13.41 18.41 19.82 19.82 18.41 13.41 12 19.82 5.59"></polygon>
            </svg>
          </div>
          <div className="modal-header">
            <span>{this.state.headerText}</span>
          </div>
          <div className="modal-body modal-body-with-header">
            {this.state.body}
          </div>
          {this.state.renderActions ? this.renderModalActions() : null}
        </div>
      </div>
    )
  }
}