import React, { useContext, useState } from 'react'
// import PropTypes from 'prop-types'
import AddCircle from '@material-ui/icons/AddCircle'
import Chip from '@material-ui/core/Chip'
import { AppContext } from '../../AppState'
// import AdditionalItem from './AdditionalItem'
import ItemInput from '../ItemInput'

export default function AdditionalItemSection() {
  // function addItem () {
  //   props.addItem(props.index)
  // }
  // function updateItem (itemId, itemName) {
  //   props.updateItem(props.index, itemId, itemName)
  // }
  // function deleteItem (itemId) {
  //   props.deleteItem(props.index, itemId)
  // }
  // const items = props.items ? props.items.map((item, index) => {
  //   return (
  //     <AdditionalItem
  //       key={index}
  //       id={item.id}
  //       item={item.name}
  //       updateItem={updateItem}
  //       deleteItem={deleteItem}
  //     />)
  // }) : null
  // return (
  //   <div>
  //     <h4>{props.type}</h4>
  //     <AddCircleOutlineIcon onClick={addItem} />
  //     {items}
  //   </div>
  // )
  const [addingItem, setAddingItem] = useState(false)
  const context = useContext(AppContext)
  const leftThings = context.additionalItems
  const [activeItem, setActiveItem] = useState(leftThings[0])
  const rightThings = []

  function toggleAddItem () {
    setAddingItem(!addingItem)
  }

  function handleSave (newValue) {
    if (newValue.trim() !== '') {
      // const newId = context.tote.namedItems && context.tote.namedItems.length ? Math.max(...context.tote.namedItems.map(item => item.id)) + 1 : 1
      // context.addNamedItem(activeItem.parentType, newValue, newId)
      // context.updateOutfitItem(dayIndex, outfitIndex, activeItem.parentType, newId)
    }
    toggleAddItem()
  }

  return (
    <div className="item-picker">
      <div className="left-column-nav">
        {leftThings.map(thing => (
          <div
            key={thing.id}
            className={thing.id === activeItem.id ? 'active' : ''}
            name={thing.name}
            onClick={() => setActiveItem(thing)}
          >
            {thing.name}
          </div>
        ))}
      </div>
      <div className="right-column">
        <div className="existing-items">
          {rightThings.map(thing => (
            <div key={thing}>thing</div>
          ))}
        </div>
        <div className="new-item">
        {addingItem ? (
          <ItemInput handleSave={handleSave} />
        )
          : <Chip key="add" icon={<AddCircle />} label="Add item" onClick={toggleAddItem} className="named-item-chip" />
        }
        </div>
      </div>
    </div>
  )



  
}

AdditionalItemSection.propTypes = {

}