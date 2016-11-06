import React from 'react'
import { OutfitSection } from './OutfitSection'

export const DaySection = React.createClass({
  getInitialState: function () {
    return {
      outfits: this.props.day.outfits
    }
  },
  updateDay: function (key, outfit, inc) {
    let tempState = this.state.outfits
    if (inc === 1) {
      tempState[key]['outfit'] = outfit
    } else {
      tempState[key]['outfit'] = {}
    }
    this.setState({outfits: tempState})
    this.props.updateTote(this.props.index, key, outfit, inc)
  },
  addOutfit: function () {
    const newOutfit = {id: this.state.outfits.length || 0}
    let tempOutfits = this.state.outfits
    tempOutfits.push(newOutfit)
    this.setState({ outfits: tempOutfits, activeOutfit: newOutfit.id })
  },
  updateActiveOutfit: function (index) {
    this.setState({activeOutfit: index})
  },
  render() {
    const outfits = this.state.outfits.map((outfit, index) => {
      return (
        <OutfitSection
          key={index}
          index={index}
          outfit={outfit}
          updateDay={this.updateDay}
          activeOutfit={this.state.activeOutfit}
          updateActiveOutfit={this.updateActiveOutfit}
        />
      )
    })
    return (
      <div>
        <h4>{this.props.day.date.format('ddd, MMM Do YYYY')}</h4>
          {outfits}
        <button onClick={this.addOutfit}>Add Outfit</button>
      </div>
    )
  }
})