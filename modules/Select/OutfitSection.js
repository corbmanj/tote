import React, {Component} from 'react'
import CheckboxSection from './CheckboxSection'
import { Collapse } from "@blueprintjs/core"
import cloneDeep from 'lodash/cloneDeep'

export default class OutfitSection extends Component {
  state = {
    outfit: this.props.outfit,
    disabled: this.props.outfit && this.props.outfit.type,
    outfitType: this.props.outfit ? this.props.outfit.type : null,
    outfitTypes: this.props.outfitTypes
  }
  selectText = (e) => {
    e.target.select()
  }
  saveOutfit = () => {
    this.setState({ disabled: true })
    this.props.updateDay(this.props.index, this.state.outfit, 1)
  }
  editOutfit = () => {
    const outfitCopy = cloneDeep(this.state.outfit)
    this.props.updateDay(this.props.index, this.state.outfit, -1)
    this.setState({ disabled: false, outfit: outfitCopy})
  }
  removeOutfit = () => {
    this.props.updateDay(this.props.index, this.state.outfit, 0)
  }
  renameOutfit = () => {
    let tempState = this.state
    tempState.renaming = true
    this.setState({tempState})
  }
  updateName = (e) => {
    let tempState = this.state.outfit
    tempState.realName = e.target.value
    this.setState({tempState})
  }
  stopRenaming = () => {
    this.setState({renaming: false})
    this.props.updateName(this.props.index, this.state.outfit.realName)
  }
  renderRenaming = () => {
    return (
      <span>
        <input
          autoFocus
          onFocus={this.selectText}
          type="text"
          value={this.state.outfit.realName}
          onChange={this.updateName}
          onBlur={this.stopRenaming}
        />
      </span>
    )
  }
  renderName = () => {
    return this.state.outfit.realName
  }
  changeOutfitType = (ev) => {
    let tempOutfit = JSON.parse(JSON.stringify(this.props.outfitTypes.find((item) => {
      return (item.type === ev.target.value)
    })))
    this.setState({
      outfit: {
        items: tempOutfit.items,
        type: tempOutfit.type,
        realName: this.state.outfit.realName
      },
      outfitType: ev.target.value
    })
  }
  updateActiveOutfit = () => {
    this.props.updateActiveOutfit(this.props.outfit.id)
  }
  toggleItem = (name, isChecked) => {
    let tempOutfit = this.state.outfit

    tempOutfit.items.forEach((item) => {
      if (item.type === name) { item.isNotIncluded = !isChecked }
    })
    this.setState({ outfit: tempOutfit })
  }
  renderCopyModal = () => {
    const modalProps = {outfit: this.state.outfit, confirmText: 'Copy Outfit'}
    this.props.renderCopyModal(modalProps)
  }
  renderOutfitDetails = () => {
    const outfitNames = this.state.outfitTypes.map(function (type, key) {
        return (
          <option key={key} value={type.type}>{type.type}</option>
        )
      }, this)
    return (
      <li>
        <Collapse isOpen={this.props.activeOutfit === this.props.outfit.id} transitionDuration={400}>
          <select className="outfittype-select" onChange={this.changeOutfitType} defaultValue={this.state.outfitType} disabled={this.state.disabled}>
            <option value={null}>Select one...</option>
            {outfitNames}
          </select>
          <span>
          {this.state.disabled ?
            <button className="outfittype-select" onClick={this.editOutfit}>Edit Outfit</button>
            : <button className="outfittype-select" disabled={!this.state.outfitType} onClick={this.saveOutfit}>Save Outfit</button>
          }
            <button className="outfittype-select" onClick={this.removeOutfit}>Remove Outfit</button>
            <button className="outfittype-select" onClick={this.renderCopyModal}>Copy Outfit</button>
          </span>
          <br />
          {this.state.outfitType ?
            <CheckboxSection
              outfit={this.state.outfit}
              outfitType={this.state.outfitType}
              toggle={this.toggleItem}
              disabled={this.state.disabled}
            /> : null
          }
        </Collapse>
      </li>
    )
  }
  render () {
    const carotClass = this.props.activeOutfit === this.props.outfit.id ? "pt-icon-standard pt-icon-chevron-down" : "pt-icon-standard pt-icon-chevron-right"
    return (
      <li>
        <h4 onClick={this.updateActiveOutfit} onDoubleClick={this.renameOutfit}>
          <span className={carotClass} />
          {this.state.renaming ? this.renderRenaming() : this.renderName()}
          {this.state.outfitType ? ` (${this.state.outfitType})` : null}
        </h4>
        <ul className="sectionList">
            {this.renderOutfitDetails()}
          </ul>
      </li>
    )
  }
}