import React from 'react'
import SetupOutfitItem from './SetupOutfitItem'

export default React.createClass({
  addItem () {
    this.props.addItem(this.props.index)
  },

  updateOutfitItem (itemIndex, itemType) {
    this.props.updateOutfitItem(this.props.index, itemIndex, itemType)
  },

  render () {
    const items = this.props.outfit.items ? this.props.outfit.items.map((item, index) => {
      return (
        <li key={index}>
          <SetupOutfitItem index={index} value={item.type} items={this.props.items} updateOutfitItem={this.updateOutfitItem} />
        </li>
      )
    }) : null
    return (
      <li>
        {this.props.outfit.type}<button className="button" onClick={this.addItem}>Add Item to this outfit</button>
        <ul className="sectionList">
          {items}
        </ul>
      </li>
    )
  }
})