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

function Section({
  section,
  index,
  editing,
  toggleOpen,
  handleDeleteClick,
  handleEditClick,
  handleFocus,
  saveOption,
  handleKeyPress,
  isOpen
}) {
  const sectionName = useRef(section.name)
  function handleToggle() {
    toggleOpen(section.id)
  }

  return (
    <li key={index}>
      <Accordion expanded={isOpen} onChange={handleToggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h4 className="inline-header">
            {editing === index ?
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
}

export default function SetupAdditionalItems() {
  const { deleteAdditionalItemCategory, updateAdditionalItemCategory, additionalItems, addAdditionalItemCategory } = useContext(AppContext)
  const [openId, setOpenId] = useState(0)
  const [editing, setEditing] = useState(false)

  function toggleOpen(clickedId) {
    setOpenId(openId !== clickedId ? clickedId : 0)
  }

  function handleDeleteClick(index) {
    deleteAdditionalItemCategory(index)
  }

  function handleEditClick(index) {
    setEditing(index)
  }

  function handleFocus(e) {
    e.target.select()
  }

  function saveOption(items, id, name) {
    updateAdditionalItemCategory(items, id, name)
    setEditing(false)
  }

  function handleKeyPress(e, items, id, name) {
    if (e.charCode === 13) {
      saveOption(items, id, name)
    }
  }

  const sections = additionalItems ? additionalItems.map((section, index) => (
    <Section
      key={section.id}
      section={section}
      index={index}
      editing={editing}
      toggleOpen={toggleOpen}
      handleDeleteClick={handleDeleteClick}
      handleEditClick={handleEditClick}
      handleFocus={handleFocus}
      saveOption={saveOption}
      handleKeyPress={handleKeyPress}
      isOpen={section.id === openId}
    />
  )) : []

  return (
    <div className="flex-5">
      <h2>Item Section</h2>
      <div><button className="button" onClick={addAdditionalItemCategory}>Add New Category</button></div>
      <ul className="sectionList">
        {!!sections.length && sections}
      </ul>
    </div>
  )
}