import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import AddCircle from '@material-ui/icons/AddCircle'
import Chip from '@material-ui/core/Chip'
import { AppContext } from '../../AppState'
import ItemInput from '../ItemInput'

function AdditionalItem ({ thing, sectionId }) {
  const isSelected = thing.selected !== false
  const context = useContext(AppContext)
  function handleClick() {
    context.selectAdditionalItem(sectionId, thing.id, isSelected)
  }

  return <Chip label={thing.name} onClick={handleClick} className="named-item-chip" color={isSelected ? 'primary' : 'default'}/>
}

export default function AdditionalItemSection() {
  const [addingItem, setAddingItem] = useState(false)
  const context = useContext(AppContext)
  const leftThings = context.additionalItems
  const [activeItemId, setActiveItemId] = useState(leftThings[0].id)
  const activeSection = leftThings.find(sec => sec.id === activeItemId)
  const rightThings = activeSection.items

  function toggleAddItem () {
    setAddingItem(!addingItem)
  }

  function handleSave (newValue) {
    if (newValue.trim() !== '') {
      context.addAdditionalItem(activeItemId, newValue)
    }
    toggleAddItem()
  }

  return (
    <div className="item-picker">
      <div className="left-column-nav">
        {leftThings.map(thing => (
          <div
            key={thing.id}
            className={thing.id === activeItemId ? 'active' : ''}
            name={thing.name}
            onClick={() => setActiveItemId(thing.id)}
          >
            {thing.name}
          </div>
        ))}
      </div>
      <div className="right-column">
        <div className="existing-items">
          {rightThings.map(thing => (
            <AdditionalItem key={thing.id} thing={thing} sectionId={activeItemId} />
          ))}
        </div>
        <div className="new-item">
        {addingItem ? (
          <ItemInput onSave={handleSave} />
        )
          : <Chip key="add" icon={<AddCircle />} label="Add item" onClick={toggleAddItem} className="named-item-chip" />
        }
        </div>
      </div>
    </div>
  )



  
}

AdditionalItem.propTypes = {
 thing: PropTypes.shape({
   id: PropTypes.number,
   name: PropTypes.string,
   selected: PropTypes.bool,
 }),
 sectionId: PropTypes.number, 
}