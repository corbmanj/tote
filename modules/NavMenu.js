import React from 'react'
import NavItem from './NavItem'

export default React.createClass({
  updateState (ev) {
    console.log(ev.target)
    this.props.updateState({currentStage: ev.target.value})
    this.forceUpdate()
  },
  // isDisabled (stage) {
  //   switch (stage){
  //     case 'home':
  //     case 'schedule':
  //       return this.props.tote
  //     case 'select':
  //       return this.props.tote.days
  //     case 'assign':
  //       return this.props.tote.unnamed
  //     case 'packing':
  //       return this.props.tote.namedItems
  //     case 'print':
  //       return this.props.tote.namedItems
  //   }
  // },
  stages: ['home', 'schedule', 'select', 'assign', 'packing', 'print'],
  render() {
    const navLinks = this.stages.map((stage, index) => {
      let classNames = (stage === this.props.active) ? "navLink active" : "navLink"
      let last = (index === this.stages.length-1)
      classNames = this.props[stage] ? "disabled" : classNames
      return <NavItem key={index} stage={stage} updateState={this.updateState} isLast={last} classNames={classNames} disabled={this.props[stage]}/>
    })
    return <div>{navLinks}</div>
  }
})