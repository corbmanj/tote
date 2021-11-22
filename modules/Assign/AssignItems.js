import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Modal from '../Shared/Modal'
import NamedItems from '../Shared/NamedItems'
import AssignDay from './AssignDay'
import AdditionalItemSection from '../Shared/AdditionalItems/AdditionalItemSection'
import { AppContext } from '../AppState'
import './assign.scss'

export default function AssignItems() {
  const [editingNamedItems, setEditingNamedItems] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const context = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    async function handleReload() {
      await context.handleReload()
    }
    if (!days) {
      handleReload()
    }
  }, [context.days])

  if (!context.days) {
    return null;
  }

  function toggleModal() {
    setEditingNamedItems(!editingNamedItems)
    const body = document.getElementsByTagName('body')[0]
    body.classList.toggle('no-scroll')
  }

  function updateNamedItems(namedItems) {
    const tote = { ...context.tote }
    tote.namedItems = namedItems
    context.setTote(tote)
  }

  function updateNamedItemInAllOutfits(id, newName) {
    const tote = { ...context.tote }
    tote.namedItems.find(item => item.id === id).name = newName
    context.setTote(tote)
  }

  function deleteNamedItem(id) {
    const tote = { ...context.tote }
    const oldItemIndex = tote.namedItems.findIndex(item => { return item.id === id })
    tote.namedItems.splice(oldItemIndex, 1)
    context.setTote(tote)
  }

  // function addItem(index) {
  //   const tote = { ...context.tote }
  //   tote.additionalItems = tote.additionalItems || []
  //   const maxId = tote.additionalItems[index].items.reduce((a, b) => {
  //     return +a > +b.id ? +a : +b.id
  //   }, -1)
  //   const newId = maxId + 1
  //   tote.additionalItems[index].items.push({ id: newId, name: 'new item' })
  //   context.setTote(tote)
  // }

  // TODO: doesn't seem like it needs to update tote for editing
  function toggleEditing(index) {
    const tote = { ...context.tote }
    tote.additionalItems[index].editing = !tote.additionalItems[index].editing
    context.setTote(tote)
  }

  function updateItem(typeIndex, itemId, itemName) {
    const tote = { ...context.tote }
    let itemToUpdate = tote.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    tote.additionalItems[typeIndex].items[itemToUpdate].name = itemName
    context.setTote(tote)
  }

  function deleteItem(typeIndex, itemId) {
    const tote = { ...context.tote }
    let itemToDelete = tote.additionalItems[typeIndex].items.findIndex(item => item.id === itemId)
    tote.additionalItems[typeIndex].items.splice(itemToDelete, 1)
    context.setTote(tote)
  }

  function updateStage() {
    if (!(context.tote.namedItems && context.tote.namedItems.length)) {
      setError(true)
      setErrorMsg('Please assign at least one item')
      return
    }
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

  return (
    <div className="outfits">
      {editingNamedItems &&
        <Modal
          contentType="NamedItems"
          closeModal={toggleModal}
          updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
          deleteNamedItem={deleteNamedItem}
          headerText="Double click an item to edit"
        >
          <NamedItems
            updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
            deleteNamedItem={deleteNamedItem}
          />
        </Modal>
      }
      <AdditionalItemSection
          // addItem={addItem}
          updateItem={updateItem}
          toggleEditing={toggleEditing}
          deleteItem={deleteItem}
      />
      <div className="day-list">
        {days}
        <Button className="continue" onClick={updateStage}>
            Continue
        </Button>
      </div>
      { error ? <span style={{ float: 'right' }} className="error">{errorMsg}</span> : null}
      </div>
  )
}