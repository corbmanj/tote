import React from 'react'
import { DaySection } from './DaySection'

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
  render() {
    const days = this.props.days.map((day, index) => {
      return(
        <DaySection
          key={index}
          index={index}
          day={day}
          updateTote={this.updateTote}
        />
      )
    })
    return (
      <div>  
        <div>Select Outfits</div>
          {days}
        <button onClick={this.updateOutfits}>Assign Items</button>
      </div>
      )
  }
})