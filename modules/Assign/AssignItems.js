import React, {useState} from 'react'
import Modal from '../Shared/Modal'
import AssignDay from './AssignDay'
import AdditionalItemSection from '../Select/AdditionalItemSection'

export default function AssignItems (props) {
  const [editingNamedItems, setEditingNamedItems] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()

  function toggleModal () {
    setEditingNamedItems(!editingNamedItems)
    const body = document.getElementsByTagName('body')[0]
    body.classList.toggle('no-scroll')
  }
  function updateNamedItems (namedItems) {
    let stateObj = {}
    stateObj.tote = props.tote
    stateObj.tote.namedItems = namedItems
    props.updateState(stateObj)
  }
  function updateNamedItemInAllOutfits (id, newName) {
    let stateObj = {}
    stateObj.tote = props.tote
    const oldItemIndex = stateObj.tote.namedItems.findIndex(item => {return item.id === id})
    stateObj.tote.namedItems[oldItemIndex].name = newName
    props.updateState(stateObj)
  }
  function deleteNamedItem (id) {
    let stateObj = {}
    stateObj.tote = props.tote
    const oldItemIndex = stateObj.tote.namedItems.findIndex(item => {return item.id === id})
    stateObj.tote.namedItems.splice(oldItemIndex, 1)
    props.updateState(stateObj)
  }
  function updateOutfit (id, outfitIndex, dayIndex) {
    let stateObj = {}
    const namedItem = props.tote.namedItems.find(item => {return item.id === Number(id)})
    stateObj.days = props.days
    stateObj.days[dayIndex].outfits[outfitIndex].items.filter(item => {
      return item.parentType === namedItem.parentType
    }).map(item => {
      item.id = namedItem.id
    })
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
    props.updateState(stateObj)
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
  function updateStage () {
    if (!(props.tote.namedItems && props.tote.namedItems.length)) {
      setError(true)
      setErrorMsg('Please assign at least one item')
      return
    }
    let stateObj = {}
    stateObj.currentStage = 'packing'
    props.updateState(stateObj)
  }
  
  const days = props.days.map((day, index) => {
    return (
      <AssignDay
        key={index}
        index={index}
        day={day}
        namedItems={props.tote.namedItems || []}
        updateNamedItems={updateNamedItems}
        updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
        updateOutfit={updateOutfit}
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
  return (
    <div className="flex-container">
      {editingNamedItems &&
        <Modal
          contentType="NamedItems"
          closeModal={toggleModal}
          namedItems={props.tote.namedItems}
          updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
          deleteNamedItem={deleteNamedItem}
        />
      }
      <div className="flex-5">
        <button style={{float: 'right'}} onClick={toggleModal} disabled={!props.tote.namedItems}>Edit Named Items</button>
        <h2 className="header">Pack Items</h2>
        <ul className="sectionList">
          {days}
        </ul>
        { error ? <span style={{float: 'right'}} className="error">{errorMsg}</span> : null }
        <button
          style={{float: 'right'}}
          onClick={updateStage}
        >Pack Items</button>
        <br />
      </div>
      <div className="flex-2">
        <h2 className="header">Other Items to Pack</h2>
        {additionalItemTypes}
      </div>
    </div>
  )
}