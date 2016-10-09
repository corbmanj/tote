import React from 'react'
import { OutfitSection } from './OutfitSection'

export const DaySection = React.createClass({
  getInitialState: function () {
    return {
      outfits: this.props.day.outfits //array of outfits for the given day
    }
  },
  addOutfit: function () {
    console.log('clicked add outfit')
    const newOutfit = {}
    let tempOutfits = this.state.outfits
    tempOutfits.push(newOutfit)
    this.setState({ outfits: tempOutfits })
  },
  render() {
    const outfits = this.state.outfits.map(function(outfit, index) {
      return (
        <OutfitSection key={index} outfit={outfit} />
      )
    })
    return (
      <div>
        <h4>{this.props.day.date.toString()}</h4>
        {outfits}
        <button onClick={this.addOutfit}>Add Outfit</button>
      </div>
    )
  }
})