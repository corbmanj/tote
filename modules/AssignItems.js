import React from 'react'
import { AssignDay } from './AssignDay'

export default React.createClass({
  updateNamedItems: function (namedItems) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    stateObj.tote.namedItems = namedItems
    this.props.updateState(stateObj)
  },
  updateOutfit: function (itemName, parentType, outfitIndex, dayIndex) {
    let stateObj = {}
    stateObj.days = this.props.days
    stateObj.days[dayIndex].outfits[outfitIndex].outfit.items.filter((item) => {
      return item.parentType === parentType
    }).map((item) => {
      console.log(item)
      item.name = itemName
    })
    console.log(itemName, parentType, outfitIndex, dayIndex)
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
          updateOutfit={this.updateOutfit}
        />
      )
    })
    return (
      <div>
        <div>Assign Items</div>
        {days}
        <button onClick={this.updateStage}>Assign Items</button>
      </div>
    )
  }
})