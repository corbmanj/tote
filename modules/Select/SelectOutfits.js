import React from 'react'
import { DaySection } from './DaySection'
import { AdditionalItemSection } from './AdditionalItemSection'
import { Collapse } from "@blueprintjs/core"

export default React.createClass({
  getInitialState: function () {
    return {
      tote: this.props.tote
    }
  },
  validateOutfits: function () {
    // check if all outfits have items
    let isError = false
    let badOutfits = []
      this.props.days.map((day, dayIndex) => {
      let filteredOutfits = day.outfits.filter((outfit) => {
        return !outfit.items
      })
      if (filteredOutfits.length > 0) {isError = true}
      badOutfits.push(filteredOutfits)
    })
    this.setState({isError: isError, badOutfits: badOutfits})
    return isError
  },
  updateOutfits: function () {
    const isError = this.validateOutfits()
    if (!isError) {
      let stateObj = {}
      stateObj.currentStage = 'assign'
      this.props.updateState(stateObj)
    }
  },
  updateTote: function (dayKey, outfitKey, outfit, inc) {
    let stateObj = {}
    stateObj.tote = this.state.tote
    stateObj.tote.unnamed = stateObj.tote.unnamed || {}
    outfit.items.map((item) => {
      if (item.dropdown === false && !item.isNotIncluded) {
        stateObj.tote.unnamed[item.type] = stateObj.tote.unnamed[item.type] ? stateObj.tote.unnamed[item.type] + inc : 1
      }
    })
    this.props.updateState(stateObj)
  },
  updateOutfitName: function (dayKey, outfitKey, name) {
    let stateObj = {}
    stateObj.days = this.props.days
    stateObj.days[dayKey].outfits[outfitKey].realName = name
    this.props.updateState(stateObj)
  },
  addItem (index) {
    let stateObj = {}
    stateObj.tote = this.state.tote
    stateObj.tote.additionalItems = stateObj.tote.additionalItems || []
    stateObj.tote.additionalItems[index].items.push('new item')
    this.props.updateState(stateObj)
  },
  toggleEditing (index) {
    let stateObj = this.state.tote
    stateObj.additionalItems[index].editing = !stateObj.additionalItems[index].editing
    this.props.updateState(stateObj)
  },
  updateItem (typeIndex, itemIndex, itemName) {
    let stateObj = this.state.tote
    stateObj.additionalItems[typeIndex].items[itemIndex] = itemName
    this.props.updateState(stateObj)
  },
  deleteItem (typeIndex, itemIndex) {
    let stateObj = this.state.tote
    stateObj.additionalItems[typeIndex].items.splice(itemIndex,1)
    this.props.updateState(stateObj)
  },
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
        badOutfits.push(<li key={`${index}-${outfit.id}`}>Day {index+1}, {outfit.realName}</li>)
      })
    }) : null
    return (
      <div className="flex-container">
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
          <Collapse isOpen={this.state.isError}>
            <div className="error">There are errors with the following outfits:
              <ul>
                {badOutfits}
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
})