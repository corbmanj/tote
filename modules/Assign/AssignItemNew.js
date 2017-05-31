import React from 'react'
import { Collapse } from "@blueprintjs/core"

export default React.createClass({
  getInitialState () {
    return {
      editing: false,
      error: false,
      errorMsg: null
    }
  },
  renderSelect () {
    const options = this.props.namedItems.filter((filteredItem) => {
      return filteredItem.parentType === this.props.item.parentType
    }).map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>
    })
    const selectValue = this.props.item.id || "select"
    return (
      <select onChange={this.handleSelectChange} value={selectValue}>
        <option value="select">Select one...</option>
        {options}
        <option value="add">add new...</option>
      </select>
    )
  },
  renderInput () {
    return (
      <span>
        <input
          defaultValue="add new"
          type="text"
          onChange={this.updateOptions}
          autoFocus
          onFocus={e => e.target.select()}
          onBlur={this.saveOption}
          onKeyPress={(ev) => {ev.charCode === 13 ? this.saveOption() : null}}
        />
        {this.state.error ? <span className="error">{this.state.errorMsg}</span> : null}
        <button onClick={this.saveOption}>Save</button>
      </span>
    )
  },
  updateOptions (ev) {
    this.setState({itemName: ev.target.value})
  },
  saveOption () {
    if (this.state.itemName === '') {
      this.setState({error: true, errorMsg: 'Item name cannot be blank'})
      return
    }
    let stateArray = this.props.namedItems
    stateArray.sort((a,b) => b.id - a.id)
    const newId = stateArray.length > 0 ? stateArray[0].id + 1 : 1
    let newItem = {parentType: this.props.item.parentType, name: this.state.itemName, id: newId}
    stateArray.push(newItem)
    this.props.updateNamedItems(stateArray)
    this.props.updateOutfit(newId)
    this.setState({ editing: false })
  },
  handleSelectChange (ev) {
    switch (ev.target.value) {
      case 'select':
        break
      case 'add':
        this.setState({ editing: true })
        break
      default:
        this.props.updateOutfit(ev.target.value)
    }
  },
  render() {
    return (
      <li> {this.props.item.type}: &nbsp;
        {this.state.editing ? this.renderInput() : this.renderSelect()}
      </li>
    )
  }
})