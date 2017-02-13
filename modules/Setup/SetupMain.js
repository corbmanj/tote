import React from 'react'
import SetupOutfits from './SetupOutfits'
import SetupItems from './SetupItems'

export default React.createClass({
  getInitialState () {
    return {outfitTypes: [], items: []}
  },

  addOutfit () {
    let newType = {type: "new outfit type", items: []}
    let outfitTypes = this.state.outfitTypes
    outfitTypes.push(newType)
    this.setState({outfitTypes: outfitTypes})
  },

  addItemToOutfit (outfitIndex) {
    let newItem = {type: 'new item'}
    let outfitTypes = this.state.outfitTypes
    outfitTypes[outfitIndex].items.push(newItem)
    this.setState(outfitTypes)
  },

  updateOutfitItem (outfitIndex, itemIndex, itemType) {
    let itemObj = this.state.items.find(item => item.type === itemType)
    let tempOutfits = this.state.outfitTypes
    tempOutfits[outfitIndex].items[itemIndex] = itemObj
    this.setState({outfitTypes: tempOutfits})
  },

  addItem () {
    let items = this.state.items
    let newItem = {type: 'new item', parentType: 'none', dropdown: false}
    items.push(newItem)
    this.setState({items: items})
  },

  updateItem (itemIndex, item) {
    let items = this.state.items
    items[itemIndex] = item
    this.setState({items: items})
  },

  render () {
    return (
      <div>
        <div>You have not set up your outfits yet!</div>
        <div className="flex-container">

          <SetupOutfits
            addOutfit={this.addOutfit}
            types={this.state.outfitTypes}
            addItem={this.addItemToOutfit}
            updateOutfitItem={this.updateOutfitItem}
            items={this.state.items}
          />

          <SetupItems
            items={this.state.items}
            addItem={this.addItem}
            updateItem={this.updateItem}
            outfits={this.state.outfitTypes}
          />

        </div>
      </div>
    )
  }
})