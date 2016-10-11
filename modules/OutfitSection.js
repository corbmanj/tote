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
    this.props.updateDay(this.props.index, this.state.outfit)
  },
  removeOutfit: function () {
    let obj = this.state.outfit
    obj.disabled = false
    this.setState({ outfit: obj })
  },
  changeOutfitType: function (ev) {
    let tempOutfit = outfitTypes.find((item) => {
      return (item.name === ev.target.value)
    })
    this.setState({ outfit: tempOutfit, outfitType: ev.target.value })
  },
  toggleItem: function (name, isChecked) {
    let tempOutfit = this.state.outfit

    tempOutfit.items.forEach((item) => {
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
          <option value={null}>Select one...</option>
          {outfitNames}
        </select>
        <br />
        {this.state.outfitType ? 
          <CheckboxSection 
            outfit="hello"
            outfitType={this.state.outfitType}
            toggle={this.toggleItem}
            disabled={this.state.outfit.disabled}/>
        : null}
        {this.state.outfit.disabled ? <button onClick={this.removeOutfit}>Remove Outfit</button> : <button disabled={!this.state.outfitType} onClick={this.saveOutfit}>Save Outfit</button>}
      </div>
    )
  }
})