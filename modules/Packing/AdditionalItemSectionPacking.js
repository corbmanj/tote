import React from 'react'

export default function AdditionalItemSectionPacking (props) {
  const items = props.items ? props.items.map((item, index) => {
    return (
      <div key={index}>
        <label><input type="checkbox"/>{item}</label>
      </div>
    )
  }) : null
  return (
    <div>
      <h3>{props.type}</h3>
      {items}
    </div>
  )
}