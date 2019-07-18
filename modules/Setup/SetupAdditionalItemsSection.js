import React, { useState } from 'react'
import SetupAdditionalItem from './SetupAdditionalItem';

export default function SetupAdditionalItemsSection (props) {
  const [items, setItems] = useState(props.items)

  function saveEditedItem (itemName, itemId) {
      const tempItems = [...items]
      let itemToUpdate = tempItems.findIndex(item => item.id === itemId)
      tempItems[itemToUpdate].name = itemName
      props.updateAdditionalItemCategory(tempItems, props.id)
      setItems(tempItems)
  }
  
  function addItem () {
    // todo: find max item id
    const tempItems = [...items]
    const newItemId = props.items.length + 1
    tempItems.push({id: newItemId, name: 'new item'})
    setItems(tempItems)
  }

  const itemsArray = items.map((item, index) => {
    return (
      <SetupAdditionalItem
        key={index}
        item={item}
        saveEditedItem={saveEditedItem}
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