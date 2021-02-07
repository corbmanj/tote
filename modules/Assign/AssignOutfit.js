import React, { useContext, useState } from 'react'
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

function AssignedItem ({ thing }) {
  function handleClick(e) {
    console.log('clicked', e.target.label)
  }

  return <Chip label={thing} onClick={handleClick} />
}

function NewMenu ({ outfitItems }) {
  const [active, setActive] = useState('one')
  const leftThings = outfitItems
    .filter(item => item.dropdown === true && item.isNotIncluded !== true)
    .map(item => item.type)
  const rightThings = ['aaay', 'beee', 'ceeee', 'deee', 'eeeeey']
  function handleMenuClick (name) {
    setActive(name)
  }
  return (
    <div className="item-picker">
      <div className="left-column-nav">
        {leftThings.map(thing => (
          <div
            key={thing}
            className={thing === active ? 'active' : ''}
            name={thing}
            onClick={() => handleMenuClick(thing)}
          >
            {thing}
            {thing === active && <div className="triangle"></div>}
          </div>
        ))}
      </div>
      <div className="right-column">
        {rightThings.map(thing => <AssignedItem key={thing} thing={thing}/>)}
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
        <NewMenu outfitItems={outfit.items} />
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
  outfit: PropTypes.string,
}

AssignedItem.propTypes = {
  thing: PropTypes.string,
}

NewMenu.propTypes = {
  outfitItems: PropTypes.arrayOf(PropTypes.string),
}