import React from 'react'

export default function AdditionalItemSectionPacking (props) {
  const items = props.items ? props.items.map((item, index) => {
    return (
      <div key={index}>
        <label>
          <input defaultChecked={item.packed} type="checkbox" onChange={() => props.handleCheckboxChange('additional', item.id, props.type)} />
          {item.id}
        </label>
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