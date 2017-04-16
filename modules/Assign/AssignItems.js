import React from 'react'
import { AssignDay } from './AssignDay'
import { AdditionalItemSection } from '../Select/AdditionalItemSection'
import { Collapse } from "@blueprintjs/core"

export default React.createClass({
  updateNamedItems: function (namedItems) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    stateObj.tote.namedItems = namedItems
    this.props.updateState(stateObj)
  },
  updateNamedItemInAllOutfits: function (name, parentType, newName) {
    let stateObj = {}
    stateObj.days = this.props.days
    stateObj.days.forEach(day => {
      day.outfits.forEach(outfit => {
        outfit.items.forEach(item => {
          if (item.name === name && item.parentType === parentType) {
            item.name = newName
          }
        })
      })
    })
    this.props.updateState(stateObj)
  },
  updateOutfit: function (itemName, parentType, outfitIndex, dayIndex) {
    let stateObj = {}
    stateObj.days = this.props.days
    stateObj.days[dayIndex].outfits[outfitIndex].items.filter((item) => {
      return item.parentType === parentType
    }).map((item) => {
      item.name = itemName
    })
    this.props.updateState(stateObj)
  },
  addItem (index) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    stateObj.tote.additionalItems = stateObj.tote.additionalItems || []
    stateObj.tote.additionalItems[index].items.push('new item')
    this.props.updateState(stateObj)
  },
  toggleEditing (index) {
    let stateObj = this.props.tote
    stateObj.additionalItems[index].editing = !stateObj.additionalItems[index].editing
    this.props.updateState(stateObj)
  },
  updateItem: function (typeIndex, itemIndex, itemName) {
    let stateObj = this.props.tote
    stateObj.additionalItems[typeIndex].items[itemIndex] = itemName
    this.props.updateState(stateObj)
  },
  updateStage: function () {
    let stateObj = {}
    stateObj.currentStage = 'packing'
    this.props.updateState(stateObj)
  },
  render() {
    const days = this.props.days.map((day, index) => {
      return (
        <AssignDay
          key={index}
          index={index}
          day={day}
          namedItems={this.props.tote.namedItems || []}
          updateNamedItems={this.updateNamedItems}
          updateNamedItemInAllOutfits={this.updateNamedItemInAllOutfits}
          updateOutfit={this.updateOutfit}
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
        />
      )
    })
    return (
      <div className="flex-container">
        <div className="flex-5">
          <h2 className="header">Assign Items</h2>
          <ul className="sectionList">
            {days}
          </ul>
          <button
            style={{float: 'right'}}
            onClick={this.updateStage}
          >Assign Items</button>
          <br />
        </div>
        <div className="flex-2">
          <h2 className="header">Other Items to Pack</h2>
          {additionalItemTypes}
        </div>
      </div>
    )
  }
})