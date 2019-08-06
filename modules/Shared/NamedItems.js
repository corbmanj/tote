import React, { useContext } from 'react'
import Item from './Item'
import { AppContext } from '../AppState'

export default function NamedItems (props) {
  const context = useContext(AppContext)
  let parentTypes = new Set()
  const namedItems = context.tote.namedItems || []
  namedItems.map(item => {
    parentTypes.add(item.parentType)
  })

  const itemList = []

  parentTypes.forEach(type => {
    const items = namedItems.filter(item => {
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