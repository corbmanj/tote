import React from 'react'
import outfitTypes from './outfitTypes'
import { CheckboxSection } from './CheckboxSection'

export const OutfitSection = React.createClass({
  getInitialState: function () {
    return {
      outfit: this.props.outfit,
      outfitTypes: outfitTypes
    }
  },
  saveOutfit: function () {
    let obj = this.state.outfit
    obj.disabled = true
    this.setState({ outfit: obj })
  },
  changeOutfitType: function (ev) {
    this.setState({outfitType: ev.target.value}) 
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
    const outfitNames = this.state.outfitTypes.map(function (type, key) {
      return (
        <option key={key} value={type.name}>{type.name}</option>
      )
    }, this)
    return (
      <div>
        <div>This is an outfit</div>
        <select onChange={this.changeOutfitType}>
          {outfitNames}
        </select>
        <br />
        {this.state.outfitType ? 
          <CheckboxSection 
            outfit="hello"
            outfitType={this.state.outfitType}
            toggle="toggle"
            disabled={false}/>
        : null}
        <button onClick={this.saveOutfit}>Save Outfit</button>
      </div>
    )
  }
})