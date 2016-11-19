import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import outfitTypes from './outfitTypes'
import { CheckboxSection } from './CheckboxSection'

export const OutfitSection = React.createClass({
  getInitialState: function () {
    return {
      outfit: this.props.outfit.outfit,
      disabled: this.props.outfit.outfit && this.props.outfit.outfit.name,
      outfitType: this.props.outfit.outfit ? this.props.outfit.outfit.name : null,
      outfitTypes: outfitTypes
    }
  },
  saveOutfit: function () {
    this.setState({ disabled: true })
    this.props.updateDay(this.props.index, this.state.outfit, 1)
  },
  removeOutfit: function () {
    this.setState({ disabled: false })
    this.props.updateDay(this.props.index, this.state.outfit, -1)
  },
  changeOutfitType: function (ev) {
    let tempOutfit = JSON.parse(JSON.stringify(outfitTypes.find((item) => {
      return (item.name === ev.target.value)
    })))
    this.setState({ outfit: tempOutfit, outfitType: ev.target.value })
  },
  updateActiveOutfit: function () {
    this.props.updateActiveOutfit(this.props.index)
  },
  toggleItem: function (name, isChecked) {
    let tempOutfit = this.state.outfit

    tempOutfit.items.forEach((item) => {
      if (item.type === name) { item.isNotIncluded = !isChecked }
    })
    this.setState({ outfit: tempOutfit })
  },
  renderOutfitDetails: function () {
    const outfitNames = this.state.outfitTypes.map(function (type, key) {
        return (
          <option key={key} value={type.name}>{type.name}</option>
        )
      }, this)
    return (
      <div>
        <select className="outfittype-select" onChange={this.changeOutfitType} defaultValue={this.state.outfitType} disabled={this.state.disabled}>
          <option value={null}>Select one...</option>
          {outfitNames}
        </select>
        <br />
        {this.state.outfitType ?
          <CheckboxSection
            outfit={this.state.outfit}
            outfitType={this.state.outfitType}
            toggle={this.toggleItem}
            disabled={this.state.disabled}
          /> : null
        }
        <span>
        {this.state.disabled ?
          <button className="outfittype-select" onClick={this.removeOutfit}>Remove Outfit</button>
          : <button className="outfittype-select" disabled={!this.state.outfitType} onClick={this.saveOutfit}>Save Outfit</button>
        }
        </span>
      </div>
    )
  },
  render () {
    return (
      <div>
        <h4 className="outfit" onClick={this.updateActiveOutfit}>
          {this.props.activeOutfit === this.props.index ? 'v ' : '> '}Outfit {this.props.index+1}
        </h4>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={0}
          transitionLeave={false}
        >
          {this.props.activeOutfit === this.props.index ? this.renderOutfitDetails() : null}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})