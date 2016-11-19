import React from 'react'
import { AssignOutfit } from './AssignOutfit'
import '../../public/skycons'

export const AssignDay = React.createClass({
  getInitialState() {
    return {activeOutfit: 0}
  },


  updateOutfit: function (itemName, parentType, outfitIndex) {
    this.props.updateOutfit(itemName, parentType, outfitIndex, this.props.index)
  },
  updateActiveOutfit: function (index) {
    this.setState({activeOutfit: index})
  },
  render() {
    const outfits = this.props.day.outfits.map((outfit, index) => {
      return (
        <AssignOutfit
          key={index}
          index={index}
          active={this.state.activeOutfit === index}
          outfit={outfit.outfit}
          namedItems={this.props.namedItems}
          updateNamedItems={this.props.updateNamedItems}
          updateOutfit={this.updateOutfit}
          updateActiveOutfit={this.updateActiveOutfit}
        />
      )
    })
    return (
      <div>
        <h3>{this.props.day.date.format('ddd, MMM Do YYYY')}</h3>
        {outfits}
      </div>
    )
  }
})