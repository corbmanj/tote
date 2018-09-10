import React, {Component} from 'react'
import SetupAdditionalItem from './SetupAdditionalItem';

export default class SetupAdditionalItemsSection extends Component {
  state = {
    items: this.props.items
  }
  saveEditedItem = (itemName, itemId) => {
    this.setState(prevState => {
      let itemToUpdate = prevState.items.findIndex(item => item.id === itemId)
      prevState.items[itemToUpdate].name = itemName
      console.log('itemList:', prevState.items)
      this.props.updateAdditionalItemCategory(prevState.items, this.props.id)
      return prevState
    })
  }
  
  addItem = () => {
    this.setState(prevState => {
      // todo: find max item id
      const newItemId = this.props.items.length + 1
      prevState.items.push({id: newItemId, name: 'new item'})
      return prevState
    })
  }

  render () {    
    const items = this.state.items.map((item, index) => {
      return (
        <SetupAdditionalItem
          key={index}
          item={item}
          saveEditedItem={this.saveEditedItem}
        />
      )
    })
    return (
      <div>
        <ul>
          {items}
          <button onClick={this.addItem}>Add Item</button>
        </ul>
      </div>
    )
  }
}