import React, {Component} from 'react'
import DaySection from './DaySection'
import AdditionalItemSection from './AdditionalItemSection'
import { Collapse } from "@blueprintjs/core"
import Modal from '../Shared/Modal'
import moment from 'moment'
import _ from 'lodash'

export default class SelectOutfits extends Component {
  state = {
    tote: this.props.tote,
    modalOpen: false,
    modalProps: false
  }
  validateOutfits = () => {
    // check if all outfits have items
    let isOutfitError = false
    let isDayError = false
    let badOutfits = []
    this.props.days.map(day => {
      let filteredOutfits = day.outfits.filter(outfit => {
        return !outfit.items
      })
      if (filteredOutfits.length > 0) {isOutfitError = true}
      badOutfits.push(filteredOutfits)
    })
    let badDays = []
    this.props.days.forEach(day => {
      if (day.outfits.length === 0) {
        badDays.push(day)
        isDayError = true
      }
    })
    this.setState({isOutfitError: isOutfitError, isDayError: isDayError, badOutfits: badOutfits, badDays: badDays})
    return (isOutfitError || isDayError)
  }
  updateOutfits = () => {
    const isError = this.validateOutfits()
    if (!isError) {
      let stateObj = {}
      stateObj.currentStage = 'assign'
      this.props.updateState(stateObj)
    }
  }
  updateTote = (dayKey, outfitKey, outfit, inc) => {
    let stateObj = {}
    stateObj.tote = this.state.tote
    stateObj.tote.unnamed = stateObj.tote.unnamed || {}
    outfit.items.map((item) => {
      if (item.dropdown === false && !item.isNotIncluded) {
        stateObj.tote.unnamed[item.type] = stateObj.tote.unnamed[item.type] ? stateObj.tote.unnamed[item.type] + inc : 1
      }
    })
    this.props.updateState(stateObj)
  }
  updateOutfitName = (dayKey, outfitKey, name) => {
    let stateObj = {}
    stateObj.days = this.props.days
    stateObj.days[dayKey].outfits[outfitKey].realName = name
    this.props.updateState(stateObj)
  }
  addItem = (index) => {
    let stateObj = {}
    stateObj.tote = this.state.tote
    stateObj.tote.additionalItems = stateObj.tote.additionalItems || []
    stateObj.tote.additionalItems[index].items.push('new item')
    this.props.updateState(stateObj)
  }
  toggleEditing = (index) => {
    let stateObj = this.state.tote
    stateObj.additionalItems[index].editing = !stateObj.additionalItems[index].editing
    this.props.updateState(stateObj)
  }
  updateItem = (typeIndex, itemIndex, itemName) => {
    let stateObj = this.state.tote
    stateObj.additionalItems[typeIndex].items[itemIndex] = itemName
    this.props.updateState(stateObj)
  }
  deleteItem = (typeIndex, itemIndex) => {
    let stateObj = this.state.tote
    stateObj.additionalItems[typeIndex].items.splice(itemIndex,1)
    this.props.updateState(stateObj)
  }
  renderCopyModal = (modalProps) => {
    modalProps.days = this.props.days
    this.setState({modalOpen: true, modalProps: modalProps})
  }
  closeModal = () => {
    this.setState({modalOpen: false})
  }
  copyOutfits = (copyArray, outfit) => {
    let stateObj = {}
    // copy outfit to each day that was selected
    stateObj.days = this.props.days
    copyArray.forEach((day, index) => {
      if (day) {
        const newOutfit = _.cloneDeep(outfit)
        newOutfit.id = stateObj.days[index].outfits.length + 1
        stateObj.days[index].outfits.push(newOutfit)
        this.updateTote(index, null, newOutfit, 1)
      }
    })
    this.props.updateState(stateObj)
    this.setState({modalOpen: false})
  }
  render() {
    const days = this.props.days.map((day, index) => {
      const imageName = day.icon + index
      return(
        <DaySection
          key={index}
          index={index}
          day={day}
          image={imageName}
          outfitTypes={this.props.outfitTypes}
          updateTote={this.updateTote}
          updateOutfitName={this.updateOutfitName}
          renderCopyModal={this.renderCopyModal}
        />
      )
    })
    const additionalItemTypes = this.props.tote.additionalItems.map((type, index) => {
      return (
        <AdditionalItemSection
          key={index}
          index={index}
          type={type.name}
          items={type.items}
          addItem={this.addItem}
          updateItem={this.updateItem}
          toggleEditing={this.toggleEditing}
          deleteItem={this.deleteItem}
        />
      )
    })
    const badOutfits = []
    this.state.badOutfits ? this.state.badOutfits.forEach((day, index) => {
      day.map(outfit => {
        badOutfits.push(<li key={`${index}-${outfit.id}`}>{moment(this.props.days[index].date).format('ddd, MMM Do')} - {outfit.realName}</li>)
      })
    }) : null
    const badDays = this.state.badDays ? this.state.badDays.map(day => {
        return <li key={day.date}>{moment(day.date).format('ddd, MMM Do')}</li>
    }) : []
    return (
      <div className="flex-container">
        {this.state.modalOpen && this.state.modalProps ?
          <Modal
            contentType="CopyOutfit"
            closeModal={this.closeModal}
            modalProps={this.state.modalProps}
            confirmAction={this.copyOutfits}
          />
          : null}
        <div className="flex-5">
          <h2 className="header">Select Outfits</h2>
          <ul className="sectionList">
            {days}
          </ul>
          <button
            style={{float: 'right'}}
            onClick={this.updateOutfits}
          >Assign Items</button>
          <br />
          <Collapse isOpen={this.state.isOutfitError}>
            <div className="error">There are errors with the following outfits:
              <ul>
                {badOutfits}
              </ul>
            </div>
          </Collapse>
          <Collapse isOpen={this.state.isDayError}>
            <div className="error">Please add at least one outfit to each of the following days:
              <ul>
                {badDays}
              </ul>
            </div>
          </Collapse>
        </div>
        <div className="flex-2">
          <h2 className="header">Other Items to Pack</h2>
          {additionalItemTypes}
        </div>
      </div>
    )
  }
}