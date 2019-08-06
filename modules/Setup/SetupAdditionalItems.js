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

  const sections = context.additionalItems.map((section, index) => {
    const carotClass = isOpen === index ? 'chevron-down' : 'chevron-right'
    // TODO: use ev.target.id with id set to index
    return (
      <li key={index}>
        <h4 onClick={() => toggleOpen(index)}>
          <Icon icon={carotClass} />
          {section.name}
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