import React from 'react'
import UnnamedItems from './UnnamedItems'
import NamedItems from './NamedItems'
import AdditionalItemSectionPacking from './AdditionalItemSectionPacking'

export default function PackingList (props) {
  const updateStage = () => {
    let stateObj = {}
    stateObj.currentStage = 'print'
    props.updateState(stateObj)
  }
  const additionalItemTypes = props.tote.additionalItems.map((type, index) => {
      return (
        <AdditionalItemSectionPacking
          key={index}
          type={type.name}
          items={type.items}
          handleCheckboxChange={props.handleCheckboxChange}
        />
      )
  })
  return (
    <div>
      <h3>Packing List</h3>
      <UnnamedItems items={props.tote.unnamed} handleCheckboxChange={props.handleCheckboxChange}/>
      <NamedItems items={props.tote.namedItems} handleCheckboxChange={props.handleCheckboxChange}/>
      {additionalItemTypes}
      <button onClick={updateStage}>Print Your Tote</button>
    </div>
  )
}