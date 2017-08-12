import React from 'react'

export default function ParentType (props) {
  const items = props.items.map((item, index) => {
    return <label key={index}><input type="checkbox" />{item.name}{index === props.items.length-1 ? null : ','} </label>
  })
  return (
    <div>
      {props.parentType}: {items}
    </div>
  )
}