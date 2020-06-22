import React, { useState, useContext } from 'react'
import { AppContext } from '../AppState'
import DaySection from './DaySection'
import AdditionalItemSection from './AdditionalItemSection'
import { Collapse } from '@blueprintjs/core'
import Modal from '../Shared/Modal'
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import './select.scss'

export default function SelectOutfits () {
  const [modalProps, setModalProps] = useState(false)
  const [error, setError] = useState({
    isOutfitError: false,
    isDayError: false
  })
  const context = useContext(AppContext)

  function validateOutfits () {
    // check if all outfits have items
    let isOutfitError = false
    let isDayError = false
    let badOutfits = []
    context.days.map(day => {
      let filteredOutfits = day.outfits.filter(outfit => {
        return !outfit.items
      })
      if (filteredOutfits.length > 0) {isOutfitError = true}
      badOutfits.push(filteredOutfits)
    })
    let badDays = []
    context.days.forEach(day => {
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
      context.expandAll()
      context.setStage('assign')
    }
  }

  function updateTote (_dayKey, _outfitKey, outfit, inc) {
    const tote = context.tote
    tote.unnamed = tote.unnamed || []
    outfit.items.map((item) => {
      if (item.dropdown === false && !item.isNotIncluded) {
        let itemTypeIndex = tote.unnamed.findIndex(foundItem => {
          return foundItem.id === item.type})
        if (itemTypeIndex === -1) {
          tote.unnamed.push({id: item.type, count: 1})
        } else {
          tote.unnamed[itemTypeIndex].count = tote.unnamed[itemTypeIndex].count + inc
        }
      }
    })
    // TODO
    context.setTote(tote)
  }

  function updateOutfitName (dayKey, outfitKey, name) {
    let days = [...context.days]
    days[dayKey].outfits[outfitKey].realName = name
    context.setDays(days)
  }

  function addItem (index) {
    // TODO create an addItem function in context
    const tote = context.tote
    tote.additionalItems = tote.additionalItems ? [...tote.additionalItems] : []
    const maxId = tote.additionalItems[index].items.reduce((a, b) => {
      return +a > +b.id ? +a : +b.id
    }, -1)
    const newId = maxId + 1
    tote.additionalItems[index].items.push({id: newId, name: 'new item'})
    context.setTote(tote)
  }

  function toggleEditing (index) {
    const tote = context.tote
    tote.additionalItems[index].editing = !tote.additionalItems[index].editing
    context.setTote(tote)
  }

  function updateItem (typeIndex, itemId, itemName) {
    const tote = context.tote
    let itemToUpdate = tote.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    tote.additionalItems[typeIndex].items[itemToUpdate].name = itemName
    context.setTote(tote)
  }

  function deleteItem (typeIndex, itemId) {
    const tote = context.tote
    let itemToDelete = tote.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    tote.additionalItems[typeIndex].items.splice(itemToDelete,1)
    context.setTote(tote)
  }

  function renderCopyModal (modalProps) {
    modalProps.days = context.days
    setModalProps(modalProps)
  }
  
  function closeModal () {
    setModalProps(false)
  }

  function copyOutfits (copyArray, outfit) {
    // copy outfit to each day that was selected
    let days = [...context.days]
    copyArray.forEach((day, index) => {
      if (day) {
        const newOutfit = cloneDeep(outfit)
        newOutfit.id = days[index].outfits.length + 1
        days[index].outfits.push(newOutfit)
        updateTote(index, null, newOutfit, 1)
      }
    })
    context.setDays(days);
    setModalProps(false)
    context.setShowToast({message: 'Outfit copied successfully', type: 'success'})
  }
  
  const days = context.days.map((day, index) => {
    const imageName = day.icon + index
    return(
      <DaySection
        key={index}
        index={index}
        day={day}
        image={imageName}
        updateTote={updateTote}
        updateOutfitName={updateOutfitName}
        renderCopyModal={renderCopyModal}
      />
    )
  })
  const additionalItemTypes = context.tote.additionalItems.map((type, index) => {
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
        badOutfitsArray.push(<li key={`${index}-${outfit.id}`}>{moment(context.days[index].date).format('ddd, MMM Do')} - {outfit.realName}</li>)
      })
    })
  }
  
  const badDaysArray = error.badDays ? error.badDays.map(day => {
      return <li key={day.date}>{moment(day.date).format('ddd, MMM Do')}</li>
  }) : []
  return (
    <div className="select-outfits">
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
      {/* <div className="flex-2">
        <h2 className="header">Other Items to Pack</h2>
        {additionalItemTypes}
      </div> */}
    </div>
  )
}