import React from 'react'

export default function UnnamedItems (props) {
  const items = Object.keys(props.items).map((item, index) => {
    return (
      <div key={index}>
        <label>
          <input type="checkbox" />
          {item} - {props.items[item]}
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