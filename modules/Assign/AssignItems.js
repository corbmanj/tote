import React, { useState, useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Modal from '../Shared/Modal'
import AssignDay from './AssignDay'
import AdditionalItemSection from '../Select/AdditionalItemSection'
import { AppContext } from '../AppState'
import './assign.scss'

export default function AssignItems () {
  const [editingNamedItems, setEditingNamedItems] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const context = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    async function handleReload () {
      await context.handleReload()
    }
    if (!days) {
      handleReload()
    }
  }, [context.days])

  if (!context.days) {
    return <></>
  }

  function toggleModal () {
    setEditingNamedItems(!editingNamedItems)
    const body = document.getElementsByTagName('body')[0]
    body.classList.toggle('no-scroll')
  }
  function updateNamedItems (namedItems) {
    const tote = {...context.tote}
    tote.namedItems = namedItems
    context.setTote(tote)
  }
  function updateNamedItemInAllOutfits (id, newName) {
    const tote = {...context.tote}
    tote.namedItems.find(item => item.id === id).name = newName
    context.setTote(tote)
  }
  function deleteNamedItem (id) {
    const tote = {...context.tote}
    const oldItemIndex = tote.namedItems.findIndex(item => {return item.id === id})
    tote.namedItems.splice(oldItemIndex, 1)
    context.setTote(tote)
  }
  function addItem (index) {
    const tote = {...context.tote}
    tote.additionalItems = tote.additionalItems || []
    const maxId = tote.additionalItems[index].items.reduce((a, b) => {
      return +a > +b.id ? +a : +b.id
    }, -1)
    const newId = maxId + 1
    tote.additionalItems[index].items.push({id: newId, name: 'new item'})
    context.setTote(tote)
  }
  // TODO: doesn't seem like it needs to update tote for editing
  function toggleEditing (index) {
    const tote = {...context.tote}
    tote.additionalItems[index].editing = !tote.additionalItems[index].editing
    context.setTote(tote)
  }
  function updateItem (typeIndex, itemId, itemName) {
    const tote = {...context.tote}
    let itemToUpdate = tote.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    tote.additionalItems[typeIndex].items[itemToUpdate].name = itemName
    context.setTote(tote)
  }
  function deleteItem (typeIndex, itemId) {
    const tote = {...context.tote}
    let itemToDelete = tote.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    tote.additionalItems[typeIndex].items.splice(itemToDelete,1)
    context.setTote(tote)
  }
  function updateStage () {
    if (!(context.tote.namedItems && context.tote.namedItems.length)) {
      setError(true)
      setErrorMsg('Please assign at least one item')
      return
    }
    context.setStage('packing')
    history.push('/packing')
  }
  
  const days = context.days.map((day, index) => {
    return (
      <AssignDay
        key={index}
        index={index}
        day={day}
        updateNamedItems={updateNamedItems}
        updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
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
  return (
    <div className="outfits">
      {editingNamedItems &&
        <Modal
          contentType="NamedItems"
          closeModal={toggleModal}
          updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
          deleteNamedItem={deleteNamedItem}
        />
      }
      {/* <div className="flex-5">
        <button style={{float: 'right'}}
          onClick={toggleModal}
          disabled={!context.tote.namedItems}
        >
          Edit Named Items
        </button> */}
        {/* <h2 className="header">Pack Items</h2> */}
        <div className="day-list">
          {days}
          <button
            className="continue"
            onClick={updateStage}
          >
            Continue
          </button>
        </div>
        { error ? <span style={{float: 'right'}} className="error">{errorMsg}</span> : null }
      {/* </div> */}
      <div className="flex-2">
        <h2 className="header">Other Items to Pack</h2>
        {additionalItemTypes}
      </div>
    </div>
  )
}