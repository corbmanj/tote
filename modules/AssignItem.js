import React from 'react'

export const AssignItem = React.createClass({
  getInitialState () {
    return {
      addNew: false,
      disableInput: false
    }
  },
  renderSelect () {
    const options = this.props.namedItems.filter((filteredItem) => {
      return filteredItem.parentType === this.props.item.parentType
    }).map((item, index) => {
      return <option key={index} value={item.name}>{item.name}</option>
    })
    return (

        <select onChange={this.handleSelectChange}>
          <option value="select">Select one...</option>
          {options}
          <option value="add">add new...</option>
        </select>
    )
  },
  renderInput () {
    return (
      <span>
        <input type="text" onChange={this.updateOptions} disabled={this.state.disableInput}/>
        <button onClick={this.saveOption}>Save</button>
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
      <label> {this.props.item.type}
        {this.state.addNew ? this.renderInput() : this.renderSelect()} |
      </label>
    )
  }
})