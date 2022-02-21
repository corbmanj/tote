import React, { useContext } from 'react'
import SetupOutfit from './SetupOutfit'
import { AppContext } from '../AppState'

export default function SetupOutfits (props) {
  const { outfitTypes, addOutfitType } = useContext(AppContext)
  
  const types = outfitTypes ? outfitTypes.map((type, index) => {
    return (
      <SetupOutfit
        key={index}
        index={index}
        outfit={type}
        items={props.items}
        updateOutfitItem={props.updateOutfitItem}
      />
    )
  }) : []
  return (
    <div className="flex-2">
      <h2>Outfit Section</h2>
      <div><button className="button" onClick={addOutfitType}>Add New Outfit Type</button></div>
      <ul className="sectionList">
      {types}
      </ul>
    </div>
  )
}