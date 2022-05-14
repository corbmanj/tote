import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import cloneDeep from 'lodash.clonedeep'
import CheckboxSection from './CheckboxSection'
import { AppContext } from '../AppState'
import { IconButton } from '@material-ui/core';
import { DeleteForever, Edit, FileCopy, Save } from '@material-ui/icons';

export default function OutfitSection(props) {
  const { outfit, index, dayIndex, updateDay, updateName } = props
  const [disabled, setDisabled] = useState(!!(outfit && outfit.type))
  const outfitType = outfit && outfit.type
  const [renaming, setRenaming] = useState(false)
  const outfitName = useRef(outfit.name)
  const context = useContext(AppContext)

  function selectText(e) {
    e.target.select()
  }

  function saveOutfit() {
    setDisabled(true)
    updateDay(index, outfit, 1)
  }

  function editOutfit() {
    updateDay(index, outfit, -1)
    setDisabled(false)
  }

  function removeOutfit() {
    context.removeOutfit(outfit.id)
  }

  function renameOutfit() {
    setRenaming(true)
  }

  function stopRenaming() {
    setRenaming(false)
    updateName(index, outfitName.current.value)
  }

  function handleKeyPress(ev) {
    if (ev.charCode === 13) {
      stopRenaming()
    }
  }

  function renderRenaming() {
    return (
      <input
        ref={outfitName}
        autoFocus
        onFocus={selectText}
        type="text"
        defaultValue={outfit.name}
        onBlur={stopRenaming}
        onKeyPress={handleKeyPress}
      />
    )
  }

  function renderName() {
    return outfit.name
  }

  function changeOutfitType(ev) {
    const templateOutfit = cloneDeep(context.outfitTypes.find(item => item.type === ev.target.value))
    const newOutfit = { ...outfit, type: templateOutfit.type, items: templateOutfit.items }
    context.setOutfit(dayIndex, index, newOutfit)
  }

  function toggleOutfitExpanded() {
    // setExpanded(!expanded)
    context.setExpanded(dayIndex, index)
  }

  function toggleItem(name, isChecked) {
    context.toggleOutfitItem(dayIndex, index, name, isChecked)
  }

  function renderCopyModal() {
    const modalProps = { outfit: outfit, confirmText: 'Copy Outfit' }
    props.renderCopyModal(modalProps)
  }

  function renderOutfitDetails() {
    return (
      <AccordionDetails className="accordion-content">
        <CheckboxSection
          outfitIndex={index}
          dayIndex={dayIndex}
          outfit={outfit}
          outfitType={outfitType}
          toggle={toggleItem}
          disabled={disabled}
        />
        <div className="buttons">
          {disabled
            ? <IconButton onClick={editOutfit}><Edit /></IconButton>
            : <IconButton disabled={!outfitType} onClick={saveOutfit}><Save /></IconButton>
          }
          <IconButton onClick={removeOutfit}><DeleteForever /></IconButton>
          <IconButton onClick={renderCopyModal}><FileCopy /></IconButton>
        </div>
      </AccordionDetails>
    )
  }

  const outfitNames = context.outfitTypes.map((type, key) => (
    <option key={key} value={type.type}>{type.type}</option>
  ))

  function prevent(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <Accordion expanded={outfit.expanded} onChange={toggleOutfitExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${index}-content`}
        id={`${index}-header`}
        className="accordion-summary"
      >
        <h4 onClick={prevent} onDoubleClick={renameOutfit} className="outfit-name">
          {renaming ? renderRenaming() : renderName()}
          {outfitType ? ` (${outfitType})` : null}
        </h4>
        <select className="outfittype-select" onClick={prevent} onChange={changeOutfitType} value={outfitType} disabled={disabled}>
          <option value={null}>Select one...</option>
          {outfitNames}
        </select>
      </AccordionSummary>
      {renderOutfitDetails()}
    </Accordion>

  )
}

OutfitSection.propTypes = {
  outfit: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    expanded: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      dropdown: PropTypes.bool,
      parentType: PropTypes.string,
      type: PropTypes.string,
    })),
  }).isRequired,
  index: PropTypes.number.isRequired,
  dayIndex: PropTypes.number.isRequired,
  updateDay: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  renderCopyModal: PropTypes.func.isRequired,
}