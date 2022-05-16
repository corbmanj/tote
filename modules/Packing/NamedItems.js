import React, { useContext } from 'react'
import ParentType from './ParentType'
import { AppContext } from '../AppState'

export default function NamedItems (props) {
  const context = useContext(AppContext)
  const parentTypes = new Set()
  if (context.tote.named) {
    context.tote.named.forEach(item => {
      parentTypes.add(item.parentType)
    })
  }
  const parentTypesArrray = [...parentTypes]

  const types = parentTypesArrray.map((parentType, index) => {
    const items = context.tote.named.filter((item) => {
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