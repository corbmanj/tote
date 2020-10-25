import React, { useContext, useState } from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { AppContext } from '../AppState'
import AssignItem from './AssignItem'
import { Collapse } from '@blueprintjs/core'

function NewMenu () {
  const [active, setActive] = useState('one')
  const leftThings = ['one', 'two', 'three', 'four', 'five']
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
        {rightThings.map(thing => (<div key={thing}>{thing}</div>))}
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
  const CarrotIcon = outfit.expanded ? KeyboardArrowDownIcon : KeyboardArrowRightIcon

  return (
    <div className="outfit-card">
      <div className="outfit-card-header" onClick={updateActiveOutfit}>
        <div className="outfit-card-toggle">
          <CarrotIcon />
          <div>{outfit.realName}</div>
        </div>
        <div className="outfit-type">{outfit.type}</div>
      </div>
        <Collapse isOpen={outfit.expanded}>
          <NewMenu />
          {/*renderItems()*/}
        </Collapse>
    </div>
  )
}