import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import NavItem from './NavItem'
import * as svg from '../../public/svg/navBar'
import './nav.scss'

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
    // case 'print':
    //   return 5
    default:
      return 0
  }
}

function NavMenu (props) {
  const stages = ['Home', 'Schedule', 'Select', 'Assign', 'Packing'] //, 'Print']
  const { location } = props
  const active = location.pathname.replace("/", ""); 

  function getSvg(stage) {
    if (getStageValue(active) > getStageValue(stage)) {
      return svg.completed
    }
    switch(getStageValue(stage)) {
      case 1:
        return getStageValue(active) === 1 ? svg.twoActive : svg.two
      case 2:
        return getStageValue(active) === 2 ? svg.threeActive : svg.three
      case 3:
        return getStageValue(active) === 3 ? svg.fourActive : svg.four
      case 4:
        return getStageValue(active) === 4 ? svg.fiveActive : svg.five
      default:
        return svg.oneAcitve
    }
  }
  
  const navLinks = stages.map((stage, index) => {
    let classNames = (stage.toLowerCase() === active) ? 'navLink active' : 'navLink'
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
          isActive={stage.toLowerCase() === active}
          disabled={props[stage]}
          svg={getSvg(stage)}
        />
        {index < stages.length - 1 && <div className="line">{svg.line}</div>}
      </div>
    )
  })
  
  return <div className="header">{navLinks}</div>
}

NavMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
}

export default withRouter(NavMenu)
