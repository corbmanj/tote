import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../AppState'
import SetupOutfits from './SetupOutfits'
import SetupItems from './SetupItems'
import SetupAdditionalItems from './SetupAdditionalItems'
// import outfitTypes from "../Select/outfitTypes";

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function SetupMain() {
  const context = useContext(AppContext)
  const history = useHistory()
  const [outfitEditor, setOutfitEditor] = useState(true)
  const [items, setItems] = useState([])

  function returnHome() {
    history.push('/home')
  }


  useEffect(() => {
    async function setup() {
      const response = await axios.get(`${baseUrl}/db/userItems/${context.userId}`)
      const items = []
      response.data.outfits.forEach(outfit => {
        outfit.items.forEach(item => {
          let alreadyExists = false
          items.forEach(existingItem => {
            if (item.type === existingItem.type) {
              alreadyExists = true
            }
          })
          if (!alreadyExists) {
            items.push(item)
          }
        })
      })
      setItems(items)
      context.setOutfitTypes(response.data.outfits)
    }
    setup()
  }, [])

  function updateOutfitItem(outfitIndex, itemIndex, itemType) {
    let itemObj = items.find(item => item.type === itemType)
    let tempOutfit = { ...context.outfitTypes[outfitIndex] }
    tempOutfit.items[itemIndex] = itemObj
    context.updateOutfitType(tempOutfit)
  }

  function addItem() {
    setItems([...items, { type: 'new item', parentType: 'none', dropdown: false }])
  }

  function updateItem(itemIndex, item) {
    let newItems = [...items]
    newItems[itemIndex] = item
    setItems(newItems)
  }

  function removeItem(itemIndex) {
    const newItems = [...items]
    newItems.splice(itemIndex, 1)
    setItems(newItems)
  }

  function toggleEditor() {
    setOutfitEditor(!outfitEditor)
  }

  function renderOutfitEditor() {
    return (
      <div>
        <div>{!!context.outfitTypes || 'You have not set up your outfits yet!'}</div>
        <div className="flex-container">
          <SetupOutfits
            updateOutfitItem={updateOutfitItem}
            items={items}
          />

          <SetupItems
            items={items}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        </div>
      </div>
    )
  }

  function renderItemEditor() {
    return (
      <SetupAdditionalItems
        addItem={addItem}
        updateItem={updateItem}
        removeItem={removeItem}
      />
    )
  }

  return (
    <div id="setup">
      <div><button onClick={returnHome}>&lt;- Return To Home</button></div>
      <button onClick={toggleEditor}>{outfitEditor ? 'Edit Additional Items' : 'Edit Outfits'}</button>
      {outfitEditor ? renderOutfitEditor() : renderItemEditor()}
    </div>
  )
}
