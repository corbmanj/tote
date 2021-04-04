import React, { useState, useRef, useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { AppContext } from '../AppState'
import SetupOutfitItem from './SetupOutfitItem'

export default function SetupOutfit (props) {
  const [editing, setEditing] = useState(false)
  const outfitName = useRef(props.outfit.type || null)
  const { outfitTypes, updateOutfitType, updateOutfitTypeById, removeOutfitType } = useContext(AppContext)

  function addItem () {
    let newItem = {type: 'new item'}
    let tempOutfit = {...outfitTypes[props.index]}
    tempOutfit.items.push(newItem)
    updateOutfitType(tempOutfit)
  }

  function updateOutfitItem (itemIndex, itemType) {
    props.updateOutfitItem(props.index, itemIndex, itemType)
  }

  function toggleEditing () {
    setEditing(!editing)
  }
  
  function updateOutfitName () {
    let editedOutfit = props.outfit
    editedOutfit.type = outfitName.current.value
    updateOutfitTypeById(editedOutfit)
    toggleEditing()
  }

  function handleRemoveOutfit () {
    removeOutfitType(props.outfit.id)
  }

  function handleKeyPress (ev) {
    if (ev.charCode === 13) {
      updateOutfitName()
    }
  }

  function autoSelect (ev) {
    ev.target.select()
  }

  function conditionallyRenderEditor () {
    if (!editing) {
      return (
        <span onDoubleClick={toggleEditing}>
          <DeleteIcon onClick={handleRemoveOutfit} />
          {props.outfit.type}
        </span>)
    } else {
      return (
        <div>
          <input
            ref={outfitName}
            type="text"
            defaultValue={props.outfit.type}
            onKeyPress={handleKeyPress}
            autoFocus
            onFocus={autoSelect}
          />
          <button onClick={updateOutfitName}>
            Save
          </button>
        </div>
      )
    }
  }
  const items = props.outfit.items ? props.outfit.items.map((item, index) => {
    return (
      <li key={index}>
        <SetupOutfitItem
          index={index}
          outfitIndex={props.index}
          value={item.type}
          items={props.items}
          updateOutfitItem={updateOutfitItem}
        />
      </li>
    )
  }) : null
  return (
    <li>
      {conditionallyRenderEditor()}
      <button className="button" onClick={addItem}>Add Item to this outfit</button>
      <ul className="sectionList">
        {items}
      </ul>
    </li>
  )
}