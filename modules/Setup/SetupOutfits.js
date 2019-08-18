import React, { useContext } from 'react'
import SetupOutfit from './SetupOutfit'
import { AppContext } from '../AppState'

export default function SetupOutfits (props) {
  const context = useContext(AppContext)
  // function addOutfitType() {
  //   context.addOutfitType()
  // }
  const types = context.outfitTypes.sort((a,b) => a.id > b.id).map((type, index) => {
    return (
      <SetupOutfit
        key={index}
        index={index}
        outfit={type}
        updateDB={props.updateDB}
        addItem={props.addItem}
        items={props.items}
        updateOutfitItem={props.updateOutfitItem}
        removeOutfitItem={props.removeOutfitItem}
        removeOutfit={props.removeOutfit}
      />
    )
  })
  return (
    <div className="flex-2">
      <h2>Outfit Section</h2>
      <div><button className="button" onClick={context.addOutfitType}>Add New Outfit Type</button></div>
      <ul className="sectionList">
      {types}
      </ul>
    </div>
  )
}