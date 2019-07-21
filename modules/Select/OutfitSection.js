import React, { useState } from 'react'
import { Icon } from '@blueprintjs/core'
import CheckboxSection from './CheckboxSection'
import { Collapse } from '@blueprintjs/core'
import cloneDeep from 'lodash/cloneDeep'

export default function OutfitSection (props) {
  const [outfit, setOutfit] = useState(props.outfit)
  const [disabled, setDisabled] = useState(props.outfit && props.outfit.type)
  const [outfitType, setOutfitType] = useState(props.outfit ? props.outfit.type : null)
  const [renaming, setRenaming] = useState(false)

  function selectText (e) {
    e.target.select()
  }

  function saveOutfit () {
    setDisabled(true)
    props.updateDay(props.index, outfit, 1)
  }

  function editOutfit () {
    const outfitCopy = cloneDeep(outfit)
    props.updateDay(props.index, outfit, -1)
    setDisabled(false)
    setOutfit(outfitCopy)
  }

  function removeOutfit () {
    props.updateDay(props.index, outfit, 0)
  }

  function renameOutfit () {
    setRenaming(true)
  }
  
  function updateName (e) {
    setOutfit({...outfit, realName: e.target.value})
  }
  
  function stopRenaming () {
    setRenaming(false)
    props.updateName(props.index, outfit.realName)
  }

  function handleKeyPress (ev) {
    if (ev.charCode === 13) {
      stopRenaming()
    }
  }

  function renderRenaming () {
    return (
      <input
        autoFocus
        onFocus={selectText}
        type="text"
        value={outfit.realName}
        onChange={updateName}
        onBlur={stopRenaming}
        onKeyPress={handleKeyPress}
      />
    )
  }

  function renderName () {
    return outfit.realName
  }

  function changeOutfitType (ev) {
    let tempOutfit = JSON.parse(JSON.stringify(props.outfitTypes.find((item) => {
      return (item.type === ev.target.value)
    })))
    setOutfit({
      items: tempOutfit.items,
        type: tempOutfit.type,
        realName: outfit.realName
    })
    setOutfitType(ev.target.value)
  }

  function updateActiveOutfit () {
    props.updateActiveOutfit(props.outfit.id)
  }

  function toggleItem (name, isChecked) {
    let tempOutfit = outfit

    tempOutfit.items.forEach((item) => {
      if (item.type === name) { item.isNotIncluded = !isChecked }
    })
    setOutfit(tempOutfit)
  }
  
  function renderCopyModal () {
    const modalProps = {outfit: outfit, confirmText: 'Copy Outfit'}
    props.renderCopyModal(modalProps)
  }

  function renderOutfitDetails () {
    const outfitNames = props.outfitTypes.map(function (type, key) {
      return (
        <option key={key} value={type.type}>{type.type}</option>
      )
    }, this)
    return (
      <li>
        <Collapse isOpen={props.activeOutfit === props.outfit.id} transitionDuration={400}>
          <select className="outfittype-select" onChange={changeOutfitType} defaultValue={outfitType} disabled={disabled}>
            <option value={null}>Select one...</option>
            {outfitNames}
          </select>
          <span>
          {disabled ?
            <button className="outfittype-select" onClick={editOutfit}>Edit Outfit</button>
            : <button className="outfittype-select" disabled={!outfitType} onClick={saveOutfit}>Save Outfit</button>
          }
            <button className="outfittype-select" onClick={removeOutfit}>Remove Outfit</button>
            <button className="outfittype-select" onClick={renderCopyModal}>Copy Outfit</button>
          </span>
          <br />
          {outfitType ?
            <CheckboxSection
              outfit={outfit}
              outfitType={outfitType}
              toggle={toggleItem}
              disabled={disabled}
            /> : null
          }
        </Collapse>
      </li>
    )
  }
  const carotClass = props.activeOutfit === props.outfit.id ? 'chevron-down' : 'chevron-right'
  return (
    <li>
      <h4 onClick={updateActiveOutfit} onDoubleClick={renameOutfit}>
        <Icon icon={carotClass} />
        {renaming ? renderRenaming() : renderName()}
        {outfitType ? ` (${outfitType})` : null}
      </h4>
      <ul className="sectionList">
          {renderOutfitDetails()}
        </ul>
    </li>
  )
}