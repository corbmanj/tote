import React from 'react'
import AssignItem from './AssignItemNew'
import { Collapse } from "@blueprintjs/core"

export const AssignOutfit = React.createClass({
  updateOutfit: function (id) {
    this.props.updateOutfit(id, this.props.index)
  },
  updateActiveOutfit: function () {
    this.props.updateActiveOutfit(this.props.index+1)
  },
  renderItems: function () {
    const items = this.props.outfit.items.filter((item) => {
      return item.dropdown === true && item.isNotIncluded !== true
    }).map((item, index) => {
      return (
        <AssignItem
          key={index}
          index={index}
          item={item}
          namedItems={this.props.namedItems}
          updateNamedItems={this.props.updateNamedItems}
          updateNamedItemInAllOutfits={this.props.updateNamedItemInAllOutfits}
          updateOutfit={this.updateOutfit}
        />
      )
    })
    return <div>{items}</div>
  },
  render() {
    const carotClass = this.props.active ? "pt-icon-standard pt-icon-chevron-down" : "pt-icon-standard pt-icon-chevron-right"
    return (
      <li>
        <h4 className="outfit" onClick={this.updateActiveOutfit}>
          <span className={carotClass} />
          {this.props.outfit.realName}: {this.props.outfit.type}
        </h4>
          <Collapse isOpen={this.props.active}>
            <ul className="sectionList">
              {this.renderItems()}
            </ul>
          </Collapse>
        <hr />
      </li>
    )
  }
})