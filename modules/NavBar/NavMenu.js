import React, {Component} from 'react'
import NavItem from './NavItem'

export default class NavMenu extends Component {
  updateState = (ev) => {
    this.props.updateState({currentStage: ev.target.value})
    this.forceUpdate()
  }
  render() {
    const stages = ['home', 'schedule', 'select', 'assign', 'packing', 'print']
    const navLinks = stages.map((stage, index) => {
      let classNames = (stage === this.props.active) ? "navLink active" : "navLink"
      let last = (index === stages.length-1)
      classNames = this.props[stage] ? "disabled" : classNames
      return <NavItem key={index} stage={stage} updateState={this.updateState} isLast={last} classNames={classNames} disabled={this.props[stage]}/>
    })
    return <div>{navLinks}</div>
  }
}