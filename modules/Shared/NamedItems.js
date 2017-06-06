import React from 'react'
import Item from './Item'

export default React.createClass({
  render () {
    let parentTypes = new Set()
    this.props.namedItems.map(item => {
      parentTypes.add(item.parentType)
    })
    const itemList = []
    parentTypes.forEach(type => {
      const items = this.props.namedItems.filter(item => {
          return item.parentType === type
        }).map((el, index) => {
          return (
            <Item
              key={index}
              index={index}
              item={el}
              updateNamedItemInAllOutfits={this.props.updateNamedItemInAllOutfits}
              deleteNamedItem={this.props.deleteNamedItem}
            />
          )
        })
    itemList.push(
    <li key={type}><h3>{type}</h3>
      <ul className="sectionList">
      {items}
      </ul>
      </li>
    )
  })
    return <ul className="sectionList">{itemList}</ul>
  }
})