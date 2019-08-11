import React, { useContext } from 'react'
import { Icon } from '@blueprintjs/core'
import { AppContext } from '../AppState'
import AssignItem from './AssignItem'
import { Collapse } from '@blueprintjs/core'

export default function AssignOutfit (props) {
  const context = useContext(AppContext)
  const updateActiveOutfit = () => {
    context.setExpanded(props.dayIndex, props.index)
    // props.updateActiveOutfit(props.index+1)
  }
  const renderItems = () => {
    const items = props.outfit.items.filter((item) => {
      return item.dropdown === true && item.isNotIncluded !== true
    }).map((item, index) => {
      return (
        <AssignItem
          key={index}
          dayIndex={props.dayIndex}
          outfitIndex={props.index}
          index={index}
          item={item}
          updateNamedItems={props.updateNamedItems}
          updateNamedItemInAllOutfits={props.updateNamedItemInAllOutfits}
        />
      )
    })
    return <div>{items}</div>
  }
  const carotClass = props.outfit.expanded ? 'chevron-down' : 'chevron-right'

  return (
    <li>
      <h4 className="outfit" onClick={updateActiveOutfit}>
        <Icon icon={carotClass} />
        {props.outfit.realName}: {props.outfit.type}
      </h4>
        <Collapse isOpen={props.outfit.expanded}>
          <ul className="sectionList">
            {renderItems()}
          </ul>
        </Collapse>
      <hr />
    </li>
  )
}