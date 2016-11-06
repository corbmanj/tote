import React from 'react'
import { AssignItem } from './AssignItem'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const AssignOutfit = React.createClass({
  updateOutfit: function (itemName, parentType) {
    this.props.updateOutfit(itemName, parentType, this.props.index)
  },
  updateActiveOutfit: function () {
    this.props.updateActiveOutfit(this.props.index)
  },
  renderItems: function () {
    const items = this.props.outfit.items.filter((item) => {
      return item.dropdown === true
    }).map((item, index) => {
      return (
        <AssignItem
          key={index}
          index={index}
          item={item}
          namedItems={this.props.namedItems}
          updateNamedItems={this.props.updateNamedItems}
          updateOutfit={this.updateOutfit}
        />
      )
    })
    return <div>{items}</div>
  },
  render() {
    return (
      <div>
        <h4 className="outfit" onClick={this.updateActiveOutfit}>Outfit {this.props.index+1}: {this.props.outfit.name}</h4>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={0}
          transitionLeave={false}
        >
          {this.props.active ? this.renderItems() : null}
        </ReactCSSTransitionGroup>
        <hr />
      </div>
    )
  }
})