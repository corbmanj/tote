import React from 'react'
import { DaySection } from './DaySection'
import { AdditionalItems } from './AdditionalItems'
import { AdditionalItemSection } from './AdditionalItemSection'

export default React.createClass({
  getInitialState: function () {
    return {
      tote: this.props.tote
    }
  },
  updateOutfits: function () {
    let stateObj = {}
    stateObj.currentStage = 'assign'
    this.props.updateState(stateObj)
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
    console.log(stateObj.days)
    stateObj.days[dayKey].outfits[outfitKey].realName = name
    this.props.updateState(stateObj)
  },
  addItem: function () {
    let stateObj = {}
    stateObj.tote = this.state.tote
    stateObj.tote.additionalItems = stateObj.tote.additionalItems || []
    let newItem = {}
    newItem.id = stateObj.tote.additionalItems.length
    newItem.name = 'unnamed'
    newItem.type = null
    stateObj.tote.additionalItems.push(newItem)
    this.props.updateState(stateObj)
  },
  updateItem: function (index, property, value) {
    console.log(index, property, value)
    let stateObj = this.state.tote
    stateObj.additionalItems[index][property] = value
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
          updateTote={this.updateTote}
          updateOutfitName={this.updateOutfitName}
        />
      )
    })
    const additionalItemTypes = this.props.tote.additionalItemTypes.map((type, index) => {
      const items = this.props.tote.additionalItems ? this.props.tote.additionalItems.filter(item => {
        return item.type === type
      }) : null
      return (
        <AdditionalItemSection
          key={index}
          type={type}
          items={items}
          resetType={this.updateItem}
        />
      )
    })
    const additionalItems = this.props.tote.additionalItems ? this.props.tote.additionalItems.filter(item => {
      return item.type === null || item.type === ''
    }).map((item, index) => {
      return(
        <AdditionalItems
          key={index}
          index={index}
          item={item}
          updateItem={this.updateItem}
          types={this.props.tote.additionalItemTypes}
        />
      )
    }) : null
    return (
      <div className="flex-container">
        <div className="flex-outfits">
          <h3>Select Outfits</h3>
            {days}
          <button
            style={{float: 'right'}}
            onClick={this.updateOutfits}
          >Assign Items</button>
        </div>
        <div className="flex-additional">
          <h3>Other Items to Pack</h3>
          {additionalItemTypes}
          {additionalItems}
          <button onClick={this.addItem}>Add additional item</button>
        </div>
      </div>
    )
  }
})