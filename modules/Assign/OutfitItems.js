import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import ItemInput from '../Shared/ItemInput'
import { AddCircle } from '@material-ui/icons'
import Chip from '@material-ui/core/Chip'
import { AppContext } from '../AppState'

function AssignedItem ({ thing, dayIndex, outfitIndex, selected, setSelected }) {
    const context = useContext(AppContext)
    function handleClick() {
      context.updateOutfitItem(dayIndex, outfitIndex, thing.parentType, thing.id)
      setSelected()
    }
  
    return <Chip label={thing.name} onClick={handleClick} className="named-item-chip" color={selected ? 'primary' : 'default'}/>
  }

export default function OutfitItems ({ outfitItems, dayIndex, outfitIndex }) {
    const [addingItem, setAddingItem] = useState(false)
    const context = useContext(AppContext)
    const namedItems = context.tote.named || []
  
    const leftThings = outfitItems
    .filter(item => item.dropdown === true && item.isNotIncluded !== true)
    const [activeItem, setActiveItem] = useState(leftThings[0])
  
    const rightThings = namedItems.filter((filteredItem) => {
      return filteredItem.parentType === activeItem.parentType
    })
  
    function toggleAddItem () {
      setAddingItem(!addingItem)
    }

    function setSelected () {
      const newActiveItem = leftThings.find(thing => thing.type === activeItem.type)
      if (newActiveItem) {
        setActiveItem(newActiveItem)
      }
    }
  
    function handleSave (newValue) {
      if (newValue.trim() !== '') {
        const newId = context.tote.named && context.tote.named.length ? Math.max(...context.tote.named.map(item => item.id)) + 1 : 1
        context.addNamedItem(activeItem.parentType, newValue, newId)
        context.updateOutfitItem(dayIndex, outfitIndex, activeItem.parentType, newId)
      }
      toggleAddItem()
    }

    if (activeItem.type === 'Work Shoes') {
      console.log('left things', leftThings)
      console.log('active item', activeItem)
    }
    
    return (
      <div className="item-picker">
        <div className="left-column-nav">
          {leftThings.map(thing => (
            <div
              key={`${thing.type}-${outfitIndex}`}
              className={thing.type === activeItem.type ? 'active' : ''}
              name={thing.type}
              onClick={() => setActiveItem(thing)}
            >
              {thing.type}
            </div>
          ))}
        </div>
        <div className="right-column">
          <div className="existing-items">
            {rightThings.map(thing => (
              <AssignedItem
                key={`${thing.name}-${outfitIndex}`}
                thing={thing}
                dayIndex={dayIndex}
                outfitIndex={outfitIndex}
                selected={activeItem.id === thing.id}
                setSelected={setSelected}
                allowClick
              />
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

  AssignedItem.propTypes = {
    thing: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      parentType: PropTypes.string,
    }),
    dayIndex: PropTypes.number,
    outfitIndex: PropTypes.number,
    selected: PropTypes.bool,
    setSelected: PropTypes.func
  }
  
  OutfitItems.propTypes = {
    outfitItems: PropTypes.arrayOf(PropTypes.shape({
      dropdown: PropTypes.bool,
      parentType: PropTypes.string,
      type: PropTypes.string,
    })),
    dayIndex: PropTypes.number,
    outfitIndex: PropTypes.number,
  }