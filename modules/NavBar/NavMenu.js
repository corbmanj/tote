import React from 'react'
import NavItem from './NavItem'

export default function NavMenu (props) {
  const stages = ['home', 'schedule', 'select', 'assign', 'packing', 'print']
  
  const navLinks = stages.map((stage, index) => {
    let classNames = (stage === props.active) ? 'navLink active' : 'navLink'
    let last = (index === stages.length-1)
    classNames = props[stage] ? 'disabled' : classNames
    return (
      <NavItem
        key={index}
        stage={stage}
        // updateState={updateState}
        isLast={last}
        classNames={classNames}
        disabled={props[stage]}
      />
    )
  })
  
  return <div>{navLinks}</div>
}