import React from 'react'
import { AssignOutfit } from './AssignOutfit'

export const AssignDay = React.createClass({
  updateOutfit: function (itemName, parentType, outfitIndex) {
    this.props.updateOutfit(itemName, parentType, outfitIndex, this.props.index)
  },
  render() {
    const outfits = this.props.day.outfits.map((outfit, index) => {
      return (
        <AssignOutfit
          key={index}
          index={index}
          outfit={outfit.outfit}
          namedItems={this.props.namedItems}
          updateNamedItems={this.props.updateNamedItems}
          updateOutfit={this.updateOutfit}
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