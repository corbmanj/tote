import React from 'react'
import ParentType from './ParentType'

export default function NamedItems (props) {
  const parentTypes = new Set()
  props.items.forEach(item => {
    parentTypes.add(item.parentType)
  })
  const parentTypesArrray = [...parentTypes]

  const types = parentTypesArrray.map((parentType, index) => {
    const items = props.items.filter((item) => {
      return item.parentType === parentType
    })
    return <ParentType key={index} parentType={parentType} items={items} handleCheckboxChange={props.handleCheckboxChange}/>
  })

  return (
    <div>
      <h4>Named Items</h4>
      {types}
    </div>
  )
}