import React, { useState } from 'react'
import SetupAdditionalItem from './SetupAdditionalItem';

export default function SetupAdditionalItemsSection (props) {
  const [items, setItems] = useState(props.items)

  function saveEditedItem (itemName, itemId) {
    const tempItems = [...items]
    let itemToUpdate = tempItems.findIndex(item => item.id === itemId)
    tempItems[itemToUpdate].name = itemName
    context.updateAdditionalItemCategory(tempItems, props.id)
    setItems(tempItems)
  }

  function deleteEditedItem (itemId) {
    const tempItems = [...items]
    let itemIndex = tempItems.findIndex(item => item.id === itemId)
    tempItems.splice(itemIndex, 1)
    context.updateAdditionalItemCategory(tempItems, props.id)
    setItems(tempItems)
  }
  
  function addItem () {
    const tempItems = [...items]
    const maxId = Math.max(...tempItems.map(item => item.id))
    const newItemId = maxId + 1
    tempItems.push({id: newItemId, name: 'new item'})
    setItems(tempItems)
  }

  const itemsArray = items.map((item, index) => {
    return (
      <SetupAdditionalItem
        key={index}
        item={item}
        saveEditedItem={saveEditedItem}
        deleteEditedItem={deleteEditedItem}
      />
    )
  })
  return (
    <div>
      <ul>
        {itemsArray}
        <button onClick={addItem}>Add Item</button>
      </ul>
    </div>
  )
}