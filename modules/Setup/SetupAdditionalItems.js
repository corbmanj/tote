import React, { useState, useContext, useRef } from 'react'
import { Collapse, Icon } from '@blueprintjs/core'
import SetupAdditionalItemsSection from './SetupAdditionalItemsSection'
import { AppContext } from '../AppState'

export default function SetupAdditionalItems (props) {
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
    const carotClass = isOpen === index ? 'chevron-down' : 'chevron-right'
    
    return (
      <li key={index}>
        <Icon onClick={() => toggleOpen(index)} icon={carotClass} />
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
          <Icon icon="delete" iconSize={15} onClick={() => handleDeleteClick(index)} />
        </h4>
        <Collapse isOpen={isOpen === index}>
          <SetupAdditionalItemsSection
            key={index}
            id={section.id}
            items={section.items}
            name={section.name}
          />
        </Collapse>
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