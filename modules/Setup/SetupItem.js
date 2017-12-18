import React from 'react'

export default function SetupItem (props) {
  const updateItem = (e, key) => {
    let tempItem = props.item
    tempItem[key] = e.target.value
    props.updateItem(props.index, tempItem)
  }
  const toggleDropdown = () => {
    let tempItem = props.item
    tempItem.dropdown = !tempItem.dropdown
    props.updateItem(tempItem)
  }

  return (
    <tr>
      <td><button disabled={props.outfitCount} onClick={() => props.removeItem(props.index)}><span className="pt-icon-standard pt-icon-delete" /></button></td>
      <td><input type="text" value={props.item.type} onChange={(e)=>{updateItem(e,'type')}} /></td>
      <td><input type="text" value={props.item.dropdown ? props.item.parentType : 'N/A'} onChange={(e)=>{updateItem(e, 'parentType')}} disabled={!props.item.dropdown}/></td>
      <td><input type="checkbox" checked={props.item.dropdown} onChange={toggleDropdown}/></td>
      <td>{props.outfitCount}</td>
    </tr>
  )
}