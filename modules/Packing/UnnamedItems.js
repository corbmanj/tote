import React from 'react'

export default function UnnamedItems (props) {
  const items = props.items.map((item, index) => {
    console.log(item)
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