import React from 'react'
import { DaySection } from './DaySection'
import PackingList from './PackingList'

export default React.createClass({
  updateOutfits: function () {
    let stateObj = {}
    stateObj.currentStage = 'assign'
    this.props.updateState(stateObj)
  },
  updateTote: function (dayKey, outfitKey, outfit) {
    let stateObj = {}
    outfit.items.map((item) => {
      if (item.dropdown === false && !item.isNotIncluded) {
        console.log(item)
      }
    })
    // stateObj.tote.days = []
    // stateObj.tote.days[key].outfits = outfits
  },
  render() {
    const days = this.props.days.map((day, index) => {
      return(
        <DaySection key={index} index={index} day={day} updateTote={this.updateTote}/>
      )
    })
    return (
      <div>  
        <div>Select Outfits</div>
        {days}
        <PackingList />
        <button onClick={this.updateOutfits}>Assign Items</button>
      </div>
      )
  }
})