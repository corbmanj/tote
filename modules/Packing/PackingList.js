import React, { useContext }from 'react'
import { useHistory } from 'react-router-dom'
import UnnamedItems from './UnnamedItems'
import NamedItems from './NamedItems'
import AdditionalItemSectionPacking from './AdditionalItemSectionPacking'
import { AppContext } from '../AppState'

export default function PackingList () {
  const context = useContext(AppContext)
  const history = useHistory()
  
  function updateStage () {
    history.push('/print')
  }

  function handleCheckboxChange (section, id, type) {
    const tote = {...context.tote}
    if (section === 'named') {
      const itemIndex = tote.namedItems.findIndex(item => item.id === id)
      tote.namedItems[itemIndex].packed = !tote.namedItems[itemIndex].packed
    } else if (section === 'unnamed') {
      const toggleItemIndex = tote.unnamed.findIndex(item => item.id === id)
      tote.unnamed[toggleItemIndex].packed = !tote.unnamed[toggleItemIndex].packed
    } else if (section === 'additional') {
      let typeIndex = tote.additionalItems.findIndex(thisType => thisType.name === type)
      let toggleItemIndex = tote.additionalItems[typeIndex].items.findIndex(item => item.id === id)
      tote.additionalItems[typeIndex].items[toggleItemIndex].packed = !tote.additionalItems[typeIndex].items[toggleItemIndex].packed
    }
    context.setTote(tote)
  }
  
  const additionalItemTypes = context.tote.additionalItems.map((type, index) => {
      return (
        <AdditionalItemSectionPacking
          key={index}
          type={type.name}
          items={type.items}
          handleCheckboxChange={handleCheckboxChange}
        />
      )
  })
  
  return (
    <div>
      <h3>Packing List</h3>
      <UnnamedItems handleCheckboxChange={handleCheckboxChange}/>
      <NamedItems handleCheckboxChange={handleCheckboxChange}/>
      {additionalItemTypes}
      <button onClick={updateStage}>Print Your Tote</button>
    </div>
  )
}