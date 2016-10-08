import React from 'react'
import NavLink from './NavLink'
import { DaySection } from './DaySection'

export default React.createClass({
  updateOutfits: function () {
    let stateObj = {}
    stateObj.currentStage = 'assign'
    this.props.updateState(stateObj)
  },
  render() {
    const days = this.props.days.map(function(day, index) {
      return(
        <DaySection key={index} index={index} day={day} />
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