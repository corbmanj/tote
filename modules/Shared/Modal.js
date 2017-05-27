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

    return (
      <div className="modal-background">
        <div className="modal-container modal-alert">
          <div className="modal-close" onClick={this.props.closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <polygon points="19.82 5.59 18.41 4.18 12 10.59 5.59 4.18 4.18 5.59 10.59 12 4.18 18.41 5.59 19.82 12 13.41 18.41 19.82 19.82 18.41 13.41 12 19.82 5.59"></polygon>
            </svg>
          </div>
          <div className="modal-header">
            <span>Double click an item to edit</span>
          </div>
          <div className="modal-body modal-body-with-header">
            <ul className="sectionList">{itemList}</ul>
          </div>
        </div>
      </div>
    )
  }
})