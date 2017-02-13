import React from 'react'
import { AdditionalItem } from './AdditionalItem'

export const AdditionalItemSection = React.createClass({
  addItem () {
    this.props.addItem(this.props.index)
  },
  updateItem (itemIndex, itemName) {
    console.log('updating item', this.props.index, itemIndex, itemName)
    this.props.updateItem(this.props.index, itemIndex, itemName)
  },
  render () {
    const items = this.props.items ? this.props.items.map((item, index) => {
      return (
        <AdditionalItem
          key={index}
          index={index}
          item={item}
          updateItem={this.updateItem}
        />)
    }) : null
    return (
      <div>
        <h4>{this.props.type}<span onClick={this.addItem} className="pt-icon-standard pt-icon-add" /></h4>
        {items}
      </div>)
  }
})