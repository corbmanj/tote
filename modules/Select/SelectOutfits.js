import React, { useState } from 'react'
import DaySection from './DaySection'
import AdditionalItemSection from './AdditionalItemSection'
import { Collapse } from '@blueprintjs/core'
import Modal from '../Shared/Modal'
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'

export default function SelectOutfits (props) {
  const [modalProps, setModalProps] = useState(false)
  const [error, setError] = useState({
    isOutfitError: false,
    isDayError: false
  })

  function validateOutfits () {
    // check if all outfits have items
    let isOutfitError = false
    let isDayError = false
    let badOutfits = []
    props.days.map(day => {
      let filteredOutfits = day.outfits.filter(outfit => {
        return !outfit.items
      })
      if (filteredOutfits.length > 0) {isOutfitError = true}
      badOutfits.push(filteredOutfits)
    })
    let badDays = []
    props.days.forEach(day => {
      if (day.outfits.length === 0) {
        badDays.push(day)
        isDayError = true
      }
    })
    setError({isOutfitError: isOutfitError, isDayError: isDayError, badOutfits: badOutfits, badDays: badDays})
    return (isOutfitError || isDayError)
  }

  function updateOutfits () {
    const isError = validateOutfits()
    if (!isError) {
      let stateObj = {}
      stateObj.currentStage = 'assign'
      props.updateState(stateObj)
    }
  }

  function updateTote (dayKey, outfitKey, outfit, inc) {
    let stateObj = {}
    stateObj.tote = props.tote
    stateObj.tote.unnamed = stateObj.tote.unnamed || []
    outfit.items.map((item) => {
      if (item.dropdown === false && !item.isNotIncluded) {
        let itemTypeIndex = stateObj.tote.unnamed.findIndex(foundItem => {
          return foundItem.id === item.type})
        if (itemTypeIndex === -1) {
          stateObj.tote.unnamed.push({id: item.type, count: 1})
        } else {
          stateObj.tote.unnamed[itemTypeIndex].count = stateObj.tote.unnamed[itemTypeIndex].count + inc
        }
      }
    })
    props.updateState(stateObj)
  }

  function updateOutfitName (dayKey, outfitKey, name) {
    let stateObj = {}
    stateObj.days = props.days
    stateObj.days[dayKey].outfits[outfitKey].realName = name
    props.updateState(stateObj)
  }

  function addItem (index) {
    let stateObj = {}
    stateObj.tote = props.tote
    stateObj.tote.additionalItems = stateObj.tote.additionalItems || []
    const maxId = stateObj.tote.additionalItems[index].items.reduce((a, b) => {
      return +a > +b.id ? +a : +b.id
    }, -1)
    const newId = maxId + 1
    stateObj.tote.additionalItems[index].items.push({id: newId, name: 'new item'})
    props.updateState(stateObj)
  }

  function toggleEditing (index) {
    let stateObj = props.tote
    stateObj.additionalItems[index].editing = !stateObj.additionalItems[index].editing
    this.props.updateState(stateObj)
  }

  function updateItem (typeIndex, itemId, itemName) {
    let stateObj = props.tote
    let itemToUpdate = stateObj.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    stateObj.additionalItems[typeIndex].items[itemToUpdate].name = itemName
    props.updateState(stateObj)
  }

  function deleteItem (typeIndex, itemId) {
    let stateObj = props.tote
    let itemToDelete = stateObj.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    stateObj.additionalItems[typeIndex].items.splice(itemToDelete,1)
    props.updateState(stateObj)
  }

  function renderCopyModal (modalProps) {
    modalProps.days = props.days
    setModalProps(modalProps)
  }
  
  function closeModal () {
    setModalProps(false)
  }

  function copyOutfits (copyArray, outfit) {
    let stateObj = {}
    // copy outfit to each day that was selected
    stateObj.days = props.days
    copyArray.forEach((day, index) => {
      if (day) {
        const newOutfit = cloneDeep(outfit)
        newOutfit.id = stateObj.days[index].outfits.length + 1
        stateObj.days[index].outfits.push(newOutfit)
        updateTote(index, null, newOutfit, 1)
      }
    })
    props.updateState(stateObj)
    setModalProps(false)
    props.showToast({message: 'Outfit copied successfully', type: 'success'})
  }
  
  const days = props.days.map((day, index) => {
    const imageName = day.icon + index
    return(
      <DaySection
        key={index}
        index={index}
        day={day}
        image={imageName}
        outfitTypes={props.outfitTypes}
        updateTote={updateTote}
        updateOutfitName={updateOutfitName}
        renderCopyModal={renderCopyModal}
      />
    )
  })
  const additionalItemTypes = props.tote.additionalItems.map((type, index) => {
    return (
      <AdditionalItemSection
        key={index}
        index={index}
        type={type.name}
        items={type.items}
        addItem={addItem}
        updateItem={updateItem}
        toggleEditing={toggleEditing}
        deleteItem={deleteItem}
      />
    )
  })
  const badOutfitsArray = []
  if (error.badOutfits) {
    error.badOutfits.forEach((day, index) => {
      day.map(outfit => {
        badOutfitsArray.push(<li key={`${index}-${outfit.id}`}>{moment(props.days[index].date).format('ddd, MMM Do')} - {outfit.realName}</li>)
      })
    })
  }
  
  const badDaysArray = error.badDays ? error.badDays.map(day => {
      return <li key={day.date}>{moment(day.date).format('ddd, MMM Do')}</li>
  }) : []
  return (
    <div className="flex-container">
      {modalProps &&
        <Modal
          contentType="CopyOutfit"
          closeModal={closeModal}
          modalProps={modalProps}
          confirmAction={copyOutfits}
        />
      }
      <div className="flex-5">
        <h2 className="header">Select Outfits</h2>
        <ul className="sectionList">
          {days}
        </ul>
        <button
          style={{float: 'right'}}
          onClick={updateOutfits}
        >
          Assign Items
        </button>
        <br />
        <Collapse isOpen={error.isOutfitError}>
          <div className="error">There are errors with the following outfits:
            <ul>
              {badOutfitsArray}
            </ul>
          </div>
        </Collapse>
        <Collapse isOpen={error.isDayError}>
          <div className="error">Please add at least one outfit to each of the following days:
            <ul>
              {badDaysArray}
            </ul>
          </div>
        </Collapse>
      </div>
      <div className="flex-2">
        <h2 className="header">Other Items to Pack</h2>
        {additionalItemTypes}
      </div>
    </div>
  )
}