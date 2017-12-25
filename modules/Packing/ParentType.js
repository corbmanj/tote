import React from 'react'

export default function ParentType (props) {
  const items = props.items.map((item, index) => {
    return (
      <label key={index}>
        <input defaultChecked={item.packed} onChange={() => props.handleCheckboxChange('named', item.id)} type="checkbox" />
        {item.name}{index === props.items.length-1 ? null : ','}
      </label>)
  })
  return (
    <div>
      {props.parentType}: {items}
    </div>
  )
}