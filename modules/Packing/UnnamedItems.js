import React, { useContext } from 'react'
import { AppContext } from '../AppState'

export default function UnnamedItems (props) {
  const context = useContext(AppContext)
  const items = context.tote.unnamed.map((item, index) => {
    return (
      <div key={index}>
        <label>
          <input type="checkbox" defaultChecked={item.packed} onChange={() => props.handleCheckboxChange('unnamed', item.id)}/>
          {item.id} - {item.count}
        </label>
      </div>
    )
  })
  return (
    <div>
      <h4>Unnamed Items</h4>
      {items}
    </div>
  )
}