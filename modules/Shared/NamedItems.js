import React from 'react'
import Item from './Item'

export default function CopyOutfit (props) {
  let parentTypes = new Set()
  props.namedItems.map(item => {
    parentTypes.add(item.parentType)
  })
  const itemList = []
  parentTypes.forEach(type => {
    const items = props.namedItems.filter(item => {
        return item.parentType === type
      }).map((el, index) => {
        return (
          <Item
            key={index}
            index={index}
            item={el}
            updateNamedItemInAllOutfits={props.updateNamedItemInAllOutfits}
            deleteNamedItem={props.deleteNamedItem}
          />
        )
      })
  itemList.push(
  <li key={type}><h3>{type}</h3>
    <ul className="sectionList">
    {items}
    </ul>
    </li>
  )
})

  return <ul className="sectionList">{itemList}</ul>
}