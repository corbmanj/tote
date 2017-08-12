import React from 'react'

export default function SetupItem (props) {
  const updateItem = (e, key) => {
    let tempItem = props.item
    tempItem[key] = e.target.value
    props.updateItem(props.index, tempItem)
  }
  const toggleDropdown = () => {
    let tempItem = this.props.item
    tempItem.dropdown = !tempItem.dropdown
    this.props.updateItem(tempItem)
  }

  return (
    <tr>
      <td><input type="text" value={props.item.type} onChange={(e)=>{updateItem(e,'type')}} /></td>
      <td><input type="text" value={props.item.parentType} onChange={(e)=>{updateItem(e, 'parentType')}} /></td>
      <td><input type="checkbox" checked={props.item.dropdown} onChange={toggleDropdown}/></td>
      <td>{props.outfitCount}</td>
    </tr>
  )
}