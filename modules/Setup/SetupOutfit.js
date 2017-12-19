import React, {Component} from 'react'
import SetupOutfitItem from './SetupOutfitItem'

export default class SetupOutfit extends Component {
  state = {
    editing: false,
    outfitName: this.props.outfit.type
  }
  addItem = () => {
    this.props.addItem(this.props.index)
  }
  updateOutfitItem = (itemIndex, itemType) => {
    this.props.updateOutfitItem(this.props.index, itemIndex, itemType)
  }
  removeOutfitItem = (itemIndex) => {
    this.props.removeOutfitItem(this.props.index, itemIndex)
  }
  toggleEditing = () => {
    this.setState(prevState => {
      return {editing: !prevState.editing}
    })
  }
  updateOutfitName = () => {
    let editedOutfit = this.props.outfit
    editedOutfit.type = this.state.outfitName
    this.props.updateDB(editedOutfit)
    this.toggleEditing()
  }
  conditionallyRenderEditor = () => {
    if (!this.state.editing) {
      return (
        <span onDoubleClick={this.toggleEditing}>
          <span className="pt-icon-standard pt-icon-delete" onClick={() => this.props.removeOutfit(this.props.outfit.id)} />
          {this.props.outfit.type}
        </span>)
    } else {
      return (
        <div>
          <input type="text" defaultValue={this.props.outfit.type} onChange={ev => {this.setState({outfitName: ev.target.value})}}/>
          <button onClick={this.updateOutfitName}>Save</button>
        </div>
      )
    }
  }
  render () {
    const items = this.props.outfit.items ? this.props.outfit.items.map((item, index) => {
      return (
        <li key={index}>
          <SetupOutfitItem index={index} value={item.type} items={this.props.items} updateOutfitItem={this.updateOutfitItem} removeOutfitItem={this.removeOutfitItem}/>
        </li>
      )
    }) : null
    return (
      <li>
        {this.conditionallyRenderEditor()}
        <button className="button" onClick={this.addItem}>Add Item to this outfit</button>
        <ul className="sectionList">
          {items}
        </ul>
      </li>
    )
  }
}