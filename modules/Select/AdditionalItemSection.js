import React from 'react'
import AdditionalItem from './AdditionalItem'

export default function AdditionalItemSection (props) {
  const addItem = () => {
    props.addItem(props.index)
  }
  const updateItem = (itemIndex, itemName) => {
    props.updateItem(props.index, itemIndex, itemName)
  }
  const deleteItem = (itemIndex) => {
    props.deleteItem(props.index, itemIndex)
  }
  const items = props.items ? props.items.map((item, index) => {
    return (
      <AdditionalItem
        key={index}
        index={index}
        item={item}
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