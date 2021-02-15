import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Accordion from '@material-ui/core/Accordion'
import Chip from '@material-ui/core/Chip'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { AppContext } from '../AppState'
import ItemInput from '../Shared/ItemInput'
// import AssignItem from './AssignItem'
import { AddCircle } from '@material-ui/icons'

function AssignedItem ({ thing, dayIndex, outfitIndex, selected }) {
  const context = useContext(AppContext)
  function handleClick() {
    context.updateOutfitItem(dayIndex, outfitIndex, thing.parentType, thing.id)
  }

  return <Chip label={thing.name} onClick={handleClick} className="named-item-chip" color={selected ? 'primary' : 'default'}/>
}

function NewMenu ({ outfitItems, dayIndex, outfitIndex }) {
  const [addingItem, setAddingItem] = useState(false)
  const context = useContext(AppContext)
  const namedItems = context.tote.namedItems || []

  const leftThings = outfitItems
  .filter(item => item.dropdown === true && item.isNotIncluded !== true)
  const [activeItem, setActiveItem] = useState(leftThings[0])

  const rightThings = namedItems
      .filter((filteredItem) => filteredItem.parentType === activeItem.parentType)
      // .map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))

  function toggleAddItem () {
    setAddingItem(!addingItem)
  }

  function handleSave (newValue) {
    if (newValue.trim() !== '') {
      const newId = context.tote.namedItems && context.tote.namedItems.length ? Math.max(...context.tote.namedItems.map(item => item.id)) + 1 : 1
      context.addNamedItem(activeItem.parentType, newValue, newId)
      context.updateOutfitItem(dayIndex, outfitIndex, activeItem.parentType, newId)
    }
    toggleAddItem()
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
            />
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

export default function AssignOutfit (props) {
  const context = useContext(AppContext)
  const {
    dayIndex,
    index,
    // updateNamedItems,
    // updateNamedItemInAllOutfits,
    outfit
  } = props

  function updateActiveOutfit () {
    context.setExpanded(dayIndex, index)
  }


  // function renderItems () {
  //   const items = outfit.items
  //   .filter((item) => {
  //     return item.dropdown === true && item.isNotIncluded !== true
  //   })
  //   .map((item, index) => {
  //     return (
  //       <AssignItem
  //         key={index}
  //         dayIndex={dayIndex}
  //         outfitIndex={index}
  //         index={index}
  //         item={item}
  //         updateNamedItems={updateNamedItems}
  //         updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
  //       />
  //     )
  //   })
  //   return <div>{items}</div>
  // }
  // const CarrotIcon = outfit.expanded ? KeyboardArrowDownIcon : KeyboardArrowRightIcon

  return (
    <Accordion expanded={outfit.expanded} onChange={updateActiveOutfit}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>{outfit.realName}</div>
        <div className="outfit-type">{outfit.type}</div>
      </AccordionSummary>
      <AccordionDetails>
        <NewMenu
          outfitItems={outfit.items}
          dayIndex={dayIndex}
          outfitIndex={index}
        />
      </AccordionDetails>
    </Accordion>
  )
}

AssignOutfit.propTypes = {
  dayIndex: PropTypes.number,
  index: PropTypes.number,
  updateNamedItems: PropTypes.func,
  updateNamedItemInAllOutfits: PropTypes.func,
  outfit: PropTypes.shape({
    type: PropTypes.string,
    realName: PropTypes.string,
    id: PropTypes.number,
    expanded: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      dropdown: PropTypes.bool,
      parentType: PropTypes.string,
      type: PropTypes.string,
    })),
  })
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
}

NewMenu.propTypes = {
  outfitItems: PropTypes.arrayOf(PropTypes.shape({
    dropdown: PropTypes.bool,
    parentType: PropTypes.string,
    type: PropTypes.string,
  })),
  dayIndex: PropTypes.number,
  outfitIndex: PropTypes.number,
}