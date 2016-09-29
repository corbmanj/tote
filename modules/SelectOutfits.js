import React from 'react'
import NavLink from './NavLink'

const OutfitSection = React.createClass({
  render() {
    return (
      <div>This is an outfit</div>
    )
  }
})

const DaySection = React.createClass({
  addOutfit: function () {
    console.log('clicked add outfit')
    const newOutfit = {}
    console.log(this.props.day)
    this.props.day.outfits.push(newOutfit)
  },
  render() {
    const outfits = this.props.day.outfits.map(function(outfit, index) {
      return (
        <OutfitSection key={index} outfit={outfit} />
      )
    })
    return (
      <div>
        <h4>{this.props.day.date.toString()}</h4>
        <button onClick={this.addOutfit}>Add Outfit</button>
      </div>
    )
  }
})

export default React.createClass({
  updateOutfits: function () {
    let stateObj = {}
    stateObj.currentStage = 'assign'
    this.props.updateState(stateObj)
  },
  render() {
    const days = this.props.days.map(function(day, index) {
      return(
        <DaySection key={index} day={day} />
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