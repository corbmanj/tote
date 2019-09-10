import React, { useState, useContext } from 'react'
import { Collapse, Icon } from '@blueprintjs/core'
import SetupAdditionalItemsSection from './SetupAdditionalItemsSection'
import { AppContext } from '../AppState'

export default function SetupAdditionalItems (props) {
  const context = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  
  function toggleOpen (index) {
    setIsOpen(isOpen !== index ? index : false)
  }

  function handleDeleteClick (index) {
    context.deleteAdditionalItemCategory(index)
  }

  const sections = context.additionalItems.map((section, index) => {
    const carotClass = isOpen === index ? 'chevron-down' : 'chevron-right'
    // TODO: use ev.target.id with id set to index

    return (
      <li key={index}>
        <Icon onClick={() => toggleOpen(index)} icon={carotClass} />
        <h4 className="inline-header">
          {section.name}
          <Icon icon="delete" iconSize={15} onClick={() => handleDeleteClick(index)} />
        </h4>
        <Collapse isOpen={isOpen === index}>
          <SetupAdditionalItemsSection
            key={index}
            id={section.id}
            items={section.items}
            name={section.name}
            updateAdditionalItemCategory={props.updateAdditionalItemCategory}
          />
        </Collapse>
      </li>
    )
  })

  return (
    <div className="flex-5">
      <h2>Item Section</h2>
      <div><button className="button" onClick={props.addAdditionalItemCategory}>Add New Category</button></div>
      <ul className="sectionList">
        {sections}
      </ul>
    </div>
  )
}