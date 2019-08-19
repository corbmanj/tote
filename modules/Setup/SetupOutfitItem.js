import React, { useContext } from 'react'
import { AppContext } from '../AppState'
import { Icon } from '@blueprintjs/core'

export default function SetupOutfitItem (props) {
  const { outfitTypes, updateOutfitType } = useContext(AppContext) 
  function updateOutfitItem (e) {
    props.updateOutfitItem(props.index, e.target.value)
  }

  function removeOutfitItem () {
    const tempOutfit = outfitTypes[props.outfitIndex]
    tempOutfit.items.splice(props.index, 1)
    updateOutfitType(tempOutfit)
  }

  const options = props.items.map((item, index) => {
    return <option key={index} value={item.type}>{item.type}</option>
  })

  return (
    <div>
      <select value={props.value} onChange={updateOutfitItem}>
        <option value="0">select one...</option>
        {options}
      </select>
      <Icon icon="delete" onClick={removeOutfitItem} />
    </div>
  )
}