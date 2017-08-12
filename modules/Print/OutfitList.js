import React from 'react'

export default function OutfitList (props) {
  const items = props.outfit.items.map((item, key) => {
    if (item.id) {
      const itemName = props.namedItems.find(namedItem => namedItem.id === item.id).name
      return <span key={key}><b>{item.parentType}:</b> {itemName}</span>
    } else { return null }
  })
  return (
    <div>
      <h3>{props.outfit.realName} ({props.outfit.type})</h3>
      {items}
    </div>
  )
}