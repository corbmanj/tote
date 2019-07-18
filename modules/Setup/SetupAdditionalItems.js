import React, { useState } from 'react'
import { Collapse } from '@blueprintjs/core'
import SetupAdditionalItemsSection from './SetupAdditionalItemsSection'

export default function SetupAdditionalItems (props) {
  const [isOpen, setIsOpen] = useState(false)
  
  function toggleOpen (index) {
    setIsOpen(isOpen !== index ? index : false)
  }

  const sections = props.sections.map((section, index) => {
    const carotClass = isOpen === index ? 'pt-icon-standard pt-icon-chevron-down' : 'pt-icon-standard pt-icon-chevron-right'
    return (
      <li key={index}>
        <h4 onClick={() => toggleOpen(index)}>
          <span className={carotClass} />
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