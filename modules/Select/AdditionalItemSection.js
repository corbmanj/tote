import React from 'react'
import { Icon } from '@blueprintjs/core'
import AdditionalItem from './AdditionalItem'

export default function AdditionalItemSection (props) {
  function addItem () {
    props.addItem(props.index)
  }
  function updateItem (itemId, itemName) {
    props.updateItem(props.index, itemId, itemName)
  }
  function deleteItem (itemId) {
    props.deleteItem(props.index, itemId)
  }
  const items = props.items ? props.items.map((item, index) => {
    return (
      <AdditionalItem
        key={index}
        id={item.id}
        item={item.name}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />)
  }) : null
  return (
    <div>
      <h4>{props.type}</h4>
      <Icon icon="add" onClick={addItem} />
      {items}
    </div>
  )
}