import React from 'react'
import AssignItem from './AssignItem'
import { Collapse } from "@blueprintjs/core"

export default function Modal (props) {
  const updateOutfit = (id) => {
    props.updateOutfit(id, props.index)
  }
  const updateActiveOutfit = () => {
    props.updateActiveOutfit(props.index+1)
  }
  const renderItems = () => {
    const items = props.outfit.items.filter((item) => {
      return item.dropdown === true && item.isNotIncluded !== true
    }).map((item, index) => {
      return (
        <AssignItem
          key={index}
          index={index}
          item={item}
          namedItems={props.namedItems}
          updateNamedItems={props.updateNamedItems}
          updateNamedItemInAllOutfits={props.updateNamedItemInAllOutfits}
          updateOutfit={updateOutfit}
        />
      )
    })
    return <div>{items}</div>
  }
  const carotClass = props.active ? "pt-icon-standard pt-icon-chevron-down" : "pt-icon-standard pt-icon-chevron-right"

  return (
    <li>
      <h4 className="outfit" onClick={updateActiveOutfit}>
        <span className={carotClass} />
        {props.outfit.realName}: {props.outfit.type}
      </h4>
        <Collapse isOpen={props.active}>
          <ul className="sectionList">
            {renderItems()}
          </ul>
        </Collapse>
      <hr />
    </li>
  )
}