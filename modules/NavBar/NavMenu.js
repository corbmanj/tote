import React from 'react'
import { Icon } from '@blueprintjs/core'
import NavItem from './NavItem'
import './nav.css'

export default function NavMenu (props) {
  const stages = ['Home', 'Schedule', 'Select', 'Assign', 'Packing', 'Print']
  
  const navLinks = stages.map((stage, index) => {
    let classNames = (stage.toLowerCase() === props.active) ? 'navLink active' : 'navLink'
    let last = (index === stages.length-1)
    classNames = props[stage] ? 'disabled' : classNames
    return (
      <>
        <NavItem
          key={index}
          stageNumber={index + 1}
          stage={stage}
          isLast={last}
          classNames={classNames}
          disabled={props[stage]}
        />
        {index < stages.length - 1 && <Icon icon="chevron-right" />}
      </>
    )
  })
  
  return <div className="header">{navLinks}</div>
}