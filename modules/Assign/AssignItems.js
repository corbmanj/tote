import React from 'react'
import Modal from '../Shared/Modal'
import { AssignDay } from './AssignDay'
import { AdditionalItemSection } from '../Select/AdditionalItemSection'
import { Collapse } from "@blueprintjs/core"

export default React.createClass({
  getInitialState () {
    return {editingNamedItems: false}
  },
  toggleModal () {
    this.setState({editingNamedItems: !this.state.editingNamedItems})
    const body = document.getElementsByTagName('body')[0]
    console.log(body.classList)
    body.classList.toggle('no-scroll')
  },
  updateNamedItems (namedItems) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    stateObj.tote.namedItems = namedItems
    this.props.updateState(stateObj)
  },
  updateNamedItemInAllOutfits (id, newName) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    const oldItemIndex = stateObj.tote.namedItems.findIndex(item => {return item.id === id})
    stateObj.tote.namedItems[oldItemIndex].name = newName
    this.props.updateState(stateObj)
  },
  deleteNamedItem (id) {
    console.log('deleting', id, typeof id)
    let stateObj = {}
    stateObj.tote = this.props.tote
    const oldItemIndex = stateObj.tote.namedItems.findIndex(item => {return item.id === id})
    console.log(oldItemIndex)
    stateObj.tote.namedItems.splice(oldItemIndex, 1)
    console.log(stateObj.tote.namedItems)
    this.props.updateState(stateObj)
  },
  updateOutfit (id, outfitIndex, dayIndex) {
    let stateObj = {}
    const namedItem = this.props.tote.namedItems.find(item => {return item.id === Number(id)})
    stateObj.days = this.props.days
    stateObj.days[dayIndex].outfits[outfitIndex].items.filter(item => {
      return item.parentType === namedItem.parentType
    }).map(item => {
      item.id = namedItem.id
    })
    this.props.updateState(stateObj)
  },
  addItem (index) {
    let stateObj = {}
    stateObj.tote = this.props.tote
    stateObj.tote.additionalItems = stateObj.tote.additionalItems || []
    stateObj.tote.additionalItems[index].items.push('new item')
    this.props.updateState(stateObj)
  },
  toggleEditing (index) {
    let stateObj = this.props.tote
    stateObj.additionalItems[index].editing = !stateObj.additionalItems[index].editing
    this.props.updateState(stateObj)
  },
  updateItem: function (typeIndex, itemIndex, itemName) {
    let stateObj = this.props.tote
    stateObj.additionalItems[typeIndex].items[itemIndex] = itemName
    this.props.updateState(stateObj)
  },
  updateStage: function () {
    let stateObj = {}
    stateObj.currentStage = 'packing'
    this.props.updateState(stateObj)
  },
  deleteItem (typeIndex, itemIndex) {
    let stateObj = this.props.tote
    stateObj.additionalItems[typeIndex].items.splice(itemIndex,1)
    this.props.updateState(stateObj)
  },
  render() {
    const days = this.props.days.map((day, index) => {
      return (
        <AssignDay
          key={index}
          index={index}
          day={day}
          namedItems={this.props.tote.namedItems || []}
          updateNamedItems={this.updateNamedItems}
          updateNamedItemInAllOutfits={this.updateNamedItemInAllOutfits}
          updateOutfit={this.updateOutfit}
        />
      )
    })
    const additionalItemTypes = this.props.tote.additionalItems.map((type, index) => {
      return (
        <AdditionalItemSection
          key={index}
          index={index}
          type={type.name}
          items={type.items}
          addItem={this.addItem}
          updateItem={this.updateItem}
          toggleEditing={this.toggleEditing}
          deleteItem={this.deleteItem}
        />
      )
    })
    return (
      <div className="flex-container">
        {this.state.editingNamedItems &&
          <Modal
            closeModal={this.toggleModal}
            namedItems={this.props.tote.namedItems}
            updateNamedItemInAllOutfits={this.updateNamedItemInAllOutfits}
            deleteNamedItem={this.deleteNamedItem}
          />
        }
        <div className="flex-5">
          <button style={{float: 'right'}} onClick={this.toggleModal}>Edit Named Items</button>
          <h2 className="header">Assign Items</h2>
          <ul className="sectionList">
            {days}
          </ul>
          <button
            style={{float: 'right'}}
            onClick={this.updateStage}
          >Assign Items</button>
          <br />
        </div>
        <div className="flex-2">
          <h2 className="header">Other Items to Pack</h2>
          {additionalItemTypes}
        </div>
      </div>
    )
  }
})