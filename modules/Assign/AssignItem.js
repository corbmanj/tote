import React from 'react'
import { Collapse } from "@blueprintjs/core"

export const AssignItem = React.createClass({
  getInitialState () {
    return {
      addNew: !!this.props.item.name,
      disableInput: !!this.props.item.name,
      itemName: this.props.item.name || null
    }
  },
  renderSelect () {
    const options = this.props.namedItems.filter((filteredItem) => {
      return filteredItem.parentType === this.props.item.parentType
    }).map((item, index) => {
      return <option key={index} value={item.name}>{item.name}</option>
    })
    const selectValue = this.props.item.name || "select"
    return (
      <select onChange={this.handleSelectChange} value={selectValue}>
        <option value="select">Select one...</option>
        {options}
        <option value="add">add new...</option>
      </select>
    )
  },
  renderSaveButton () {
    return <button onClick={this.saveOption}>Save</button>
  },
  renderRemoveButton () {
    return <button onClick={this.removeOption}>Remove</button>
  },
  renderStatic () {
    return (
      <span>
        <span>{this.state.itemName}</span>
        <button onClick={this.saveOption} disabled={this.state.disableInput}>Save</button>
        <button onClick={this.editOption} disabled={!this.state.disableInput}>Edit</button>
        <button onClick={this.removeOption} disabled={!this.state.disableInput}>Remove</button>
      </span>
    )
  },
  renderInput () {
    return (
      <span>
        <input
          defaultValue={this.state.itemName}
          type="text"
          onChange={this.updateOptions}
          disabled={this.state.disableInput}
          autoFocus
          onFocus={e => e.target.select()}
          onBlur={this.saveOption}
          onKeyPress={(ev) => {ev.charCode === 13 ? this.saveOption() : null}}
        />
        <button onClick={this.saveOption} disabled={this.state.disableInput}>Save</button>
        <button onClick={this.editOption} disabled={!this.state.disableInput}>Edit</button>
        <button onClick={this.removeOption} disabled={!this.state.disableInput}>Remove</button>
      </span>
    )
  },
  updateOptions (ev) {
    this.setState({itemName: ev.target.value})
  },
  saveOption () {
    this.setState({ disableInput: true })
    let stateArray = this.props.namedItems
    let newItem = {parentType: this.props.item.parentType, name: this.state.itemName}
    stateArray.push(newItem)
    this.props.updateNamedItems(stateArray)
    this.props.updateOutfit(this.state.itemName, this.props.item.parentType)
  },
  removeOption () {
    let stateArray = this.props.namedItems
    const filteredArray = stateArray.filter(el => {
      return !(el.name === this.state.itemName && el.parentType === this.props.item.parentType)
    })
    this.props.updateNamedItems(filteredArray)
    this.props.updateOutfit(null, this.props.item.parentType)
    this.props.updateNamedItemInAllOutfits(this.state.itemName, this.props.item.parentType, null)
    this.setState({ disableInput: false, addNew: false, itemName: null })
  },
  editOption () {
    let stateArray = this.props.namedItems
    const filteredArray = stateArray.filter(el => {
      return !(el.name === this.state.itemName && el.parentType === this.props.item.parentType)
    })
    this.props.updateNamedItems(filteredArray)
    this.props.updateOutfit(null, this.props.item.parentType)
    this.setState({ disableInput: false})
  },
  handleSelectChange (ev) {
    switch (ev.target.value) {
      case 'select':
        break
      case 'add':
        this.setState({ addNew: true })
        break
      default:
        this.props.updateOutfit(ev.target.value, this.props.item.parentType)
    }
  },
  render() {
    return (
      // <li> {this.props.item.type}: &nbsp;
      //   {this.state.addNew ? (this.state.disableInput ? this.renderStatic() : this.renderInput()) : this.renderSelect()}
      // </li>
      <li> {this.props.item.type}: &nbsp;
        {this.state.addNew ? this.renderInput() : this.renderSelect()}
      </li>
    )
  }
})