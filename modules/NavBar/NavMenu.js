import React from 'react'
import { Icon } from '@blueprintjs/core'
import NavItem from './NavItem'
import * as svg from '../../public/svg/navBar'
import './nav.css'

function getStageValue(value) {
  switch(value.toLowerCase()) {
    case 'schedule':
      return 1
    case 'select':
      return 2
    case 'assign':
      return 3
    case 'packing':
      return 4
    case 'print':
      return 5
    default:
      return 0
  }
}

export default function NavMenu (props) {
  const stages = ['Home', 'Schedule', 'Select', 'Assign', 'Packing', 'Print']

  function getSvg(stage) {
    console.log('1', getStageValue(props.active), '2', getStageValue(stage))
    if (getStageValue(props.active) > getStageValue(stage)) {
      console.log('a')
      return svg.completed
    }
    console.log('get', stage, getStageValue(stage))
    switch(getStageValue(stage)) {
      case 1:
        console.log('b')
        return getStageValue(props.active) === 1 ? svg.twoActive : svg.two
      case 2:
        console.log('c')
        return getStageValue(props.active) === 2 ? svg.threeActive : svg.three
      case 3:
        console.log('d')
        return getStageValue(props.active) === 3 ? svg.fourActive : svg.four
      case 4:
        console.log('e')
        return getStageValue(props.active) === 4 ? svg.fiveActive : svg.five
      default:
        console.log('f')
        return svg.oneAcitve
    }
  }
  
  const navLinks = stages.map((stage, index) => {
    let classNames = (stage.toLowerCase() === props.active) ? 'navLink active' : 'navLink'
    let last = (index === stages.length-1)
    classNames = props[stage] ? 'disabled' : classNames
    return (
      <div key={stage} className={'flex'}>
        <NavItem
          key={stage}
          stageNumber={index}
          stage={stage}
          isLast={last}
          classNames={classNames}
          disabled={props[stage]}
          svg={getSvg(stage)}
        />
        {index < stages.length - 1 && svg.line}
      </div>
    )
  })
  
  return <div className="header">{navLinks}</div>
}