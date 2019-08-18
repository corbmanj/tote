import React from 'react'
import { Button } from '@blueprintjs/core'

export default function SetupItem (props) {
  function updateItem (e) {
    let tempItem = props.item
    tempItem[e.target.id] = e.target.value
    props.updateItem(props.index, tempItem)
  }
  function toggleDropdown () {
    let tempItem = props.item
    tempItem.dropdown = !tempItem.dropdown
    props.updateItem(tempItem)
  }
  function removeItem () {
    props.removeItem(props.index)
  }

  const { type, dropdown, parentType } = props.item
  return (
    <tr>
      <td><Button disabled={props.outfitCount} icon="delete" onClick={removeItem} minimal={true} /></td>
      <td><input type="text" id="type" value={type} onChange={updateItem} /></td>
      <td><input type="text" id="parentType" value={dropdown ? parentType : 'N/A'} onChange={updateItem} disabled={!dropdown}/></td>
      <td><input type="checkbox" checked={dropdown} onChange={toggleDropdown}/></td>
      <td>{props.outfitCount}</td>
    </tr>
  )
}