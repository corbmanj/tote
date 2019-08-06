import React, { useContext }from 'react'
import UnnamedItems from './UnnamedItems'
import NamedItems from './NamedItems'
import AdditionalItemSectionPacking from './AdditionalItemSectionPacking'
import { AppContext } from '../AppState'

export default function PackingList (props) {
  const context = useContext(AppContext)
  
  function updateStage () {
    context.setStage('print')
  }
  
  const additionalItemTypes = context.tote.additionalItems.map((type, index) => {
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
      <UnnamedItems handleCheckboxChange={props.handleCheckboxChange}/>
      <NamedItems handleCheckboxChange={props.handleCheckboxChange}/>
      {additionalItemTypes}
      <button onClick={updateStage}>Print Your Tote</button>
    </div>
  )
}