import React from 'react'
import SetupOutfitItem from './SetupOutfitItem'

export default function SetupOutfit (props) {
  const addItem = () => {
    props.addItem(props.index)
  }
  const updateOutfitItem = (itemIndex, itemType) => {
    props.updateOutfitItem(props.index, itemIndex, itemType)
  }
  const items = props.outfit.items ? props.outfit.items.map((item, index) => {
    return (
      <li key={index}>
        <SetupOutfitItem index={index} value={item.type} items={props.items} updateOutfitItem={updateOutfitItem} />
      </li>
    )
  }) : null

  return (
    <li>
      {props.outfit.type}<button className="button" onClick={addItem}>Add Item to this outfit</button>
      <ul className="sectionList">
        {items}
      </ul>
    </li>
  )
}