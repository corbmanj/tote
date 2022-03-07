import React, { useContext } from 'react'
import { AppContext } from '../AppState'

export default function OutfitList (props) {
  const context = useContext(AppContext)
  const items = props.outfit.items.map((item, key) => {
    if (item.id) {
      if (props.index === 1) {
        console.log(context.tote.namedItems, 'and', item)
      }
      // todo: coerce item id to number before saving it instead of here
      const foundItem = context.tote.namedItems.find(namedItem => Number(namedItem.id) === Number(item.id)) 
      const itemName = foundItem ? foundItem.name : ''
      return <span key={key}><b>{item.parentType}:</b> {itemName}</span>
    } else { return null }
  })
  return (
    <div>
      <h3>{props.outfit.name} ({props.outfit.type})</h3>
      {items}
    </div>
  )
}