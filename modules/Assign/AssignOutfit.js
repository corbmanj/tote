import React from 'react'
import { AssignItem } from './AssignItem'

export const AssignOutfit = React.createClass({
  updateOutfit: function (itemName, parentType) {
    this.props.updateOutfit(itemName, parentType, this.props.index)
  },
  render() {
    const items = this.props.outfit.items.filter((item) => {
      return item.dropdown === true
    }).map((item, index) => {
      return (
        <AssignItem
          key={index}
          index={index}
          item={item}
          namedItems={this.props.namedItems}
          updateNamedItems={this.props.updateNamedItems}
          updateOutfit={this.updateOutfit}
        />
      )
    })
    return (
      <div>
        <h4 className="outfit">Outfit {this.props.index+1}: {this.props.outfit.name}</h4>
        <div>{items}</div>
        <hr />
      </div>
    )
  }
})