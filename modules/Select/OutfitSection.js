import React, { useState, useRef, useContext } from 'react'
import { Icon } from '@blueprintjs/core'
import { Collapse } from '@blueprintjs/core'
import cloneDeep from 'lodash/cloneDeep'
import CheckboxSection from './CheckboxSection'
import { AppContext } from '../AppState'

export default function OutfitSection (props) {
  const [disabled, setDisabled] = useState(props.outfit && props.outfit.type)
  const outfitType = props.outfit && props.outfit.type
  const [renaming, setRenaming] = useState(false)
  // const [expanded, setExpanded] = useState(props.dayIndex === 0)
  const outfitName = useRef(props.outfit.realName)
  const context = useContext(AppContext)

  function selectText (e) {
    e.target.select()
  }

  function saveOutfit () {
    setDisabled(true)
    props.updateDay(props.index, props.outfit, 1)
  }

  function editOutfit () {
    props.updateDay(props.index, props.outfit, -1)
    setDisabled(false)
  }

  function removeOutfit () {
    context.removeOutfit(props.dayIndex, props.index)
  }

  function renameOutfit () {
    setRenaming(true)
  }
  
  function stopRenaming () {
    setRenaming(false)
    props.updateName(props.index, outfitName.current.value)
  }

  function handleKeyPress (ev) {
    if (ev.charCode === 13) {
      stopRenaming()
    }
  }

  function renderRenaming () {
    return (
      <input
        ref={outfitName}
        autoFocus
        onFocus={selectText}
        type="text"
        defaultValue={props.outfit.realName}
        onBlur={stopRenaming}
        onKeyPress={handleKeyPress}
      />
    )
  }

  function renderName () {
    return props.outfit.realName
  }

  function changeOutfitType (ev) {
    const templateOutfit = cloneDeep(context.outfitTypes.find(item => item.type === ev.target.value))
    const newOutfit = {...props.outfit, type: templateOutfit.type, items: templateOutfit.items}
    context.setOutfit(props.dayIndex, props.index, newOutfit)
  }

  function toggleOutfitExpanded () {
    // setExpanded(!expanded)
    context.setExpanded(props.dayIndex, props.index)
  }

  function toggleItem (name, isChecked) {
    let tempOutfit = props.outfit

    tempOutfit.items.forEach((item) => {
      if (item.type === name) { item.isNotIncluded = !isChecked }
    })
  }
  
  function renderCopyModal () {
    const modalProps = {outfit: props.outfit, confirmText: 'Copy Outfit'}
    props.renderCopyModal(modalProps)
  }

  function renderOutfitDetails () {
    const outfitNames = context.outfitTypes.map((type, key) => (
        <option key={key} value={type.type}>{type.type}</option>
      )
    )
    return (
      <li>
        <Collapse isOpen={props.outfit.expanded} transitionDuration={400}>
          <select className="outfittype-select" onChange={changeOutfitType} value={outfitType} disabled={disabled}>
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
          {outfitType &&
            <CheckboxSection
              outfit={props.outfit}
              outfitType={outfitType}
              toggle={toggleItem}
              disabled={disabled}
            />}
        </Collapse>
      </li>
    )
  }
  const carotClass = props.outfit.expanded ? 'chevron-down' : 'chevron-right'
  return (
    <li>
      <Icon icon={carotClass} onClick={toggleOutfitExpanded} />
      <h4 onDoubleClick={renameOutfit} className="inline-header">
        {renaming ? renderRenaming() : renderName()}
        {outfitType ? ` (${outfitType})` : null}
      </h4>
      <ul className="sectionList">
          {renderOutfitDetails()}
        </ul>
    </li>
  )
}