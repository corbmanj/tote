import React, {Component} from 'react'
import { Collapse } from "@blueprintjs/core"
import SetupAdditionalItemsSection from './SetupAdditionalItemsSection'

export default class SetupAdditionalItems extends Component {
  state = {
    isOpen: false
  }
  toggleOpen = (index) => {
    this.setState((prevState) => {
      const newIndex = prevState.isOpen !== index ? index : false
      return {isOpen: newIndex}
    })
  }
  render () {    
    const sections = this.props.sections.map((section, index) => {
      const carotClass = this.state.isOpen === index ? "pt-icon-standard pt-icon-chevron-down" : "pt-icon-standard pt-icon-chevron-right"
      return (
        <li key={index}>
          <h4 onClick={() => this.toggleOpen(index)}>
            <span className={carotClass} />
            {section.name}
          </h4>
          <Collapse isOpen={this.state.isOpen === index}>
            <SetupAdditionalItemsSection
              key={index}
              id={section.id}
              items={section.items}
              name={section.name}
              updateAdditionalItemCategory={this.props.updateAdditionalItemCategory}
            />
          </Collapse>
        </li>
      )
    })
    return (
      <div className="flex-5">
        <h2>Item Section</h2>
        <div><button className="button" onClick={this.props.addAdditionalItemCategory}>Add New Category</button></div>
        <ul className="sectionList">
          {sections}
        </ul>
      </div>
    )
  }
}