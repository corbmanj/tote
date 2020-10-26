import React, { useState, useContext, useRef } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import SetupAdditionalItemsSection from './SetupAdditionalItemsSection'
import { AppContext } from '../AppState'

export default function SetupAdditionalItems () {
  const context = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  
  function toggleOpen (index) {
    setIsOpen(isOpen !== index ? index : false)
  }

  function handleDeleteClick (index) {
    context.deleteAdditionalItemCategory(index)
  }

  function handleEditClick (index) {
    setEditing(index)
  }

  function handleFocus (e) {
    e.target.select()
  }

  function saveOption (items, id, name) {
    context.updateAdditionalItemCategory(items, id, name)
    setEditing(false)
  }

  function handleKeyPress (e, items, id, name) {
    if (e.charCode === 13) {
      saveOption(items, id, name)
    }
  }

  const sections = context.additionalItems.map((section, index) => {
    const sectionName = useRef(section.name)
    // const CarrotIcon = isOpen === index ? KeyboardArrowDownIcon : KeyboardArrowRightIcon
    
    return (
      <li key={index}>
        <Accordion expanded={isOpen === index} onChange={() => toggleOpen(index)}>
        {/* <CarrotIcon onClick={() => toggleOpen(index)} /> */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h4 className="inline-header">
          { editing === index ? 
            <input
              ref={sectionName}
              defaultValue={section.name}
              type="text"
              autoFocus
              onFocus={handleFocus}
              onBlur={() => saveOption(section.items, section.id, sectionName.current.value)}
              onKeyPress={(e) => handleKeyPress(e, section.items, section.id, sectionName.current.value)}
            /> :
            <span onDoubleClick={() => handleEditClick(index)}>{section.name}</span>
          }
          <DeleteIcon onClick={() => handleDeleteClick(index)} />
        </h4>
        </AccordionSummary>
        <AccordionDetails>
          <SetupAdditionalItemsSection
            key={index}
            id={section.id}
            items={section.items}
            name={section.name}
          />
        </AccordionDetails>
        </Accordion>
      </li>
    )
  })

  return (
    <div className="flex-5">
      <h2>Item Section</h2>
      <div><button className="button" onClick={context.addAdditionalItemCategory}>Add New Category</button></div>
      <ul className="sectionList">
        {sections}
      </ul>
    </div>
  )
}