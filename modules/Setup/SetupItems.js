import React, { useContext } from 'react'
import SetupItem from './SetupItem'
import { AppContext } from '../AppState'

export default function SetupItems (props) {
  const context = useContext(AppContext)
  const items = props.items.map((item, index) => {
    let outfitCount = 0
    for (let outfit in context.outfitTypes) {
      for (let outfitItem in context.outfitTypes[outfit].items) {
        if (context.outfitTypes[outfit].items[outfitItem].type === item.type) {
          outfitCount++
        }
      }
    }
    return <SetupItem key={index} index={index} item={item} updateItem={props.updateItem} removeItem={props.removeItem} outfitCount={outfitCount}/>
  })
  return (
    <div className="flex-5">
      <h2>Item Section</h2>
      <div><button className="button" onClick={props.addItem}>Add New Item</button></div>
      <ul className="sectionList">
        <table>
          <thead>
          <tr><th></th><th>Item Name</th><th>Item Type</th><th>Named Item?</th><th>Outfit Count</th></tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </ul>
    </div>
  )
}