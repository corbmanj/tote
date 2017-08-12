import React from 'react'
import SetupItem from './SetupItem'

export default function SetupItems (props) {
  const items = props.items.map((item, index) => {
    let outfitCount = 0
    for (let outfit in props.outfits) {
      for (let outfitItem in props.outfits[outfit].items) {
        if (props.outfits[outfit].items[outfitItem].type === item.type) {
          outfitCount++
        }
      }
    }
    return <SetupItem key={index} index={index} item={item} updateItem={props.updateItem} outfitCount={outfitCount}/>
  })
  return (
    <div className="flex-5">
      <span>Add some items so you can build out your outfits on the left.</span>
      <h2>Item Section</h2>
      <div><button className="button" onClick={props.addItem}>Add New Item</button></div>
      <ul className="sectionList">
        <table>
          <thead>
            <tr><th>Item Name</th><th>Item Type</th><th>Specify Item?</th><th>Outfit Count</th></tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </ul>
    </div>
  )
}