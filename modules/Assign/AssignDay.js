import React, { useState } from 'react'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'
import AssignOutfit from './AssignOutfit'
import { Collapse } from '@blueprintjs/core'

export default function AssignDay (props) {
  const [activeOutfit, setActiveOutfit] = useState(1)
  const [isOpen, setIsOpen] = useState(props.index === 0)

  function updateOutfit (id, outfitIndex) {
    props.updateOutfit(id, outfitIndex, props.index)
  }

  function updateActiveOutfit (index) {
    setActiveOutfit(index)
  }

  function toggleOpen () {
    setIsOpen(!isOpen)
  }

  const outfits = props.day.outfits.map((outfit, index) => {
    return (
      <AssignOutfit
        key={index}
        index={index}
        active={activeOutfit === outfit.id}
        outfit={outfit}
        namedItems={props.namedItems}
        updateNamedItems={props.updateNamedItems}
        updateNamedItemInAllOutfits={props.updateNamedItemInAllOutfits}
        updateOutfit={updateOutfit}
        updateActiveOutfit={updateActiveOutfit}
      />
    )
  })

  const carotClass = isOpen ? 'chevron-down' : 'chevron-right'

  return (
    <li>
      <h3 onClick={toggleOpen}>
        <Icon icon={carotClass} />
        {moment(props.day.date).format('ddd, MMM Do YYYY')}
      </h3>
      <Collapse isOpen={isOpen}>
        <p>{props.day.summary}</p>
        <p>High: {props.day.high} &deg;F Low: {props.day.low}&deg; F</p>
        <ul className="sectionList">
          {outfits}
        </ul>
      </Collapse>
    </li>
  )
}