import React from 'react'
import AdditionalItem from './AdditionalItem'

export default function AdditionalItemSection (props) {
  const addItem = () => {
    props.addItem(props.index)
  }
  const updateItem = (itemId, itemName) => {
    props.updateItem(props.index, itemId, itemName)
  }
  const deleteItem = (itemId) => {
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
      <h4 onClick={addItem}>{props.type}<span className="pt-icon-standard pt-icon-add" /></h4>
      {items}
    </div>
  )
}