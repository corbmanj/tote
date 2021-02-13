import React, { useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import Chip from '@material-ui/core/Chip';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { AppContext } from '../AppState'
import AssignItem from './AssignItem'
import { AddCircle, Done } from '@material-ui/icons';
import { Divider, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function AssignedItem ({ thing }) {
  function handleClick(e) {
    console.log('clicked', e.target.label)
  }

  return <Chip label={thing.name} onClick={handleClick} className="named-item-chip"/>
}

function NewMenu ({ outfitItems, dayIndex, outfitIndex }) {
  const classes = useStyles()
  const [addingItem, setAddingItem] = useState(false)
  const newItemRef = useRef()
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

  function handleSave () {
    console.log('saving', newItemRef.current.value)

    if (newItemRef.current.value.trim() !== '') {
      const newId = context.tote.namedItems && context.tote.namedItems.length ? Math.max(...context.tote.namedItems.map(item => item.id)) + 1 : 1
      context.addNamedItem(activeItem.parentType, newItemRef.current.value, newId)
      context.updateOutfitItem(dayIndex, outfitIndex, activeItem.parentType, newId)
    }

    toggleAddItem()
  }
  
  return (
    <div className="item-picker">
      <div className="left-column-nav">
        {leftThings.map(thing => (
          <div
            key={thing.type}
            className={thing.type === activeItem.type ? 'active' : ''}
            name={thing.type}
            onClick={() => setActiveItem(thing)}
          >
            {thing.type}
            {/* {thing === active && <div className="triangle"></div>} */}
          </div>
        ))}
      </div>
      <div className="right-column">
        <div className="existing-items">
          {rightThings.map(thing => <AssignedItem key={thing} thing={thing}/>)}
        </div>
        <div className="new-item">
        {addingItem ? (
          <Paper component="form" className={classes.root}>
           <InputBase placeholder="add item..." className={classes.input} inputRef={newItemRef}/>
           <Divider orientation="vertical" className={classes.divider} />
           <IconButton color="primary" aria-label="done" onClick={handleSave} className={classes.iconButton}>
             <Done />
           </IconButton>
          </Paper>
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
  const { dayIndex, index, updateNamedItems, updateNamedItemInAllOutfits, outfit } = props

  function updateActiveOutfit () {
    context.setExpanded(dayIndex, index)
  }


  function renderItems () {
    const items = outfit.items
    .filter((item) => {
      return item.dropdown === true && item.isNotIncluded !== true
    })
    .map((item, index) => {
      return (
        <AssignItem
          key={index}
          dayIndex={dayIndex}
          outfitIndex={index}
          index={index}
          item={item}
          updateNamedItems={updateNamedItems}
          updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
        />
      )
    })
    return <div>{items}</div>
  }
  // const CarrotIcon = outfit.expanded ? KeyboardArrowDownIcon : KeyboardArrowRightIcon

  return (
    <Accordion expanded={outfit.expanded} onChange={updateActiveOutfit}>
      {/*<div className="outfit-card">*/}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {/* className="outfit-card-header" onClick={updateActiveOutfit}> */}
        {/* <div className="outfit-card-toggle"> */}
          {/* <CarrotIcon /> */}
        <div>{outfit.realName}</div>
        {/* </div> */}
        <div className="outfit-type">{outfit.type}</div>
      </AccordionSummary>
      <AccordionDetails>
        <NewMenu
          outfitItems={outfit.items}
          dayIndex={dayIndex}
          outfitIndex={index}
        />
          {/*renderItems()*/}
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
  thing: PropTypes.string,
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