import React, { useContext } from 'react'
import ParentType from './ParentType'
import { AppContext } from '../AppState'

export default function NamedItems (props) {
  const context = useContext(AppContext)
  const parentTypes = new Set()
  if (context.tote.namedItems) {
    context.tote.namedItems.forEach(item => {
      parentTypes.add(item.parentType)
    })
  }
  const parentTypesArrray = [...parentTypes]

  const types = parentTypesArrray.map((parentType, index) => {
    const items = context.tote.namedItems.filter((item) => {
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