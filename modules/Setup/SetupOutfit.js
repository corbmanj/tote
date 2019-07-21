import React, { useState, useRef } from 'react'
import SetupOutfitItem from './SetupOutfitItem'
import { Icon } from '@blueprintjs/core'

export default function SetupOutfit (props) {
  const [editing, setEditing] = useState(false)
  const outfitName = useRef(props.outfit.type || null)

  function addItem () {
    props.addItem(props.index)
  }

  function updateOutfitItem (itemIndex, itemType) {
    props.updateOutfitItem(props.index, itemIndex, itemType)
  }

  function removeOutfitItem (itemIndex) {
    props.removeOutfitItem(props.index, itemIndex)
  }

  function toggleEditing () {
    setEditing(!editing)
  }
  
  function updateOutfitName () {
    let editedOutfit = props.outfit
    editedOutfit.type = outfitName.current.value
    props.updateDB(editedOutfit)
    toggleEditing()
  }

  function handleRemoveOutfit () {
    props.removeOutfit(this.props.outfit.id)
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
          <Icon icon="delete" onClick={handleRemoveOutfit} />
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
        <SetupOutfitItem index={index} value={item.type} items={props.items} updateOutfitItem={updateOutfitItem} removeOutfitItem={removeOutfitItem}/>
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