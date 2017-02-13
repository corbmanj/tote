import React from 'react'

export default React.createClass({
  updateItem (e, key) {
    let tempItem = this.props.item
    tempItem[key] = e.target.value
    this.props.updateItem(this.props.index, tempItem)
  },

  toggleDropdown () {
    let tempItem = this.props.item
    tempItem.dropdown = !tempItem.dropdown
    this.props.updateItem(tempItem)
  },

  render () {
    return (
      <tr>
        <td><input type="text" value={this.props.item.type} onChange={(e)=>{this.updateItem(e,'type')}} /></td>
        <td><input type="text" value={this.props.item.parentType} onChange={(e)=>{this.updateItem(e, 'parentType')}} /></td>
        <td><input type="checkbox" checked={this.props.item.dropdown} onChange={this.toggleDropdown}/></td>
        <td>{this.props.outfitCount}</td>
      </tr>
    )
  }
})