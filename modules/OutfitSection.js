import React from 'react'
import outfitTypes from './outfitTypes'
import { CheckboxSection } from './CheckboxSection'

export const OutfitSection = React.createClass({
  getInitialState: function () {
    return {
      outfit: this.props.outfit
    }
  },
  saveOutfit: function () {
    let obj = this.state.outfit
    obj.disabled = true
    this.setState({ outfit: obj })
  },
  changeOutfitType: function (ev) {
    console.log('option changed')
    let outfitArray = outfitTypes.filter(function (type) {
      return type.name = ev.target.value
    }, this)[0]
    console.log(outfitArray)
    console.log(outfitTypes)
    this.setState({ outfit: outfitArray })
  },
  toggleItem: function (name, isChecked) {
    console.log('toggled item', name, isChecked)
    let tempOutfit = this.state.outfit
    tempOutfit.items.forEach(function (item) {
      if (item.type === name) { item.isNotIncluded = !isChecked }
    })
    this.setState({ outfit: tempOutfit })
  },
  render() {
    const outfitNames = outfitTypes.map(function (type, key) {
      return (
        <option key={key} value={type.name}>{type.name}</option>
      )
    }, this)
    return (
      <div>
        <div>This is an outfit</div>
      {outfitTypes.toString()}
        <select onChange={this.changeOutfitType}>
          {outfitNames}
          <option value="add">Add new...</option>
        </select>
        <br />
        {this.state.outfit.hasOwnProperty('name') ? 
          <CheckboxSection 
            outfit={this.state.outfit} 
            toggle={this.toggleItem} 
            disabled={this.state.outfit.disabled}/>
        : null}
        <button onClick={this.saveOutfit}>Save Outfit</button>
      </div>
    )
  }
})