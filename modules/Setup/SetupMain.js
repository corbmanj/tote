import React, { Component } from 'react'
import axios from 'axios'
import { AppContext } from '../AppState'
import SetupOutfits from './SetupOutfits'
import SetupItems from './SetupItems'
import SetupAdditionalItems from './SetupAdditionalItems'
// import outfitTypes from "../Select/outfitTypes";

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class SetupMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outfitEditor: true,
      items: []
    }
  }
  

  async componentDidMount () {
    const response = await axios.get(`${baseUrl}/db/userItems/${this.context.userId}`)
      const items  = []
      response.data.outfits.forEach(outfit => {
        outfit.items.forEach(item => {
          let alreadyExists = false
          items.forEach(existingItem => {
            if (item.type === existingItem.type) {
              alreadyExists = true
            }
          })
          if (!alreadyExists) {
            items.push(item)
          }
        })
      })
      this.setState({ items })
      this.context.setOutfitTypes(response.data.outfits)
  }
  updateOutfitItem = (outfitIndex, itemIndex, itemType) => {
    let itemObj = this.state.items.find(item => item.type === itemType)
    let tempOutfit = {...this.context.outfitTypes[outfitIndex]}
    tempOutfit.items[itemIndex] = itemObj
    this.context.updateOutfitType(tempOutfit)
  }
  addItem = () => {
    this.setState((prevState) => {
      const newItems = [...prevState.items, {type: 'new item', parentType: 'none', dropdown: false}]
      return {items: newItems}
    })
  }
  updateItem = (itemIndex, item) => {
    this.setState((prevState) => {
      let newItems = [...prevState.items]
      newItems[itemIndex] = item
      return {items: newItems}
    })
  }
  removeItem = (itemIndex) => {
    this.setState(prevState => {
      const newItems = [...prevState.items]
      newItems.splice(itemIndex, 1)
      return {items: newItems}
    })
  }
  toggleEditor = () => {
    this.setState(prevState => {return {outfitEditor: !prevState.outfitEditor}})
  }
  renderOutfitEditor () {
    return (
      <div>
        <div>{!!this.context.outfitTypes || 'You have not set up your outfits yet!'}</div>
        <div className="flex-container">
          <SetupOutfits
            updateOutfitItem={this.updateOutfitItem}
            items={this.state.items}
            />

          <SetupItems
            items={this.state.items}
            addItem={this.addItem}
            updateItem={this.updateItem}
            removeItem={this.removeItem}
          />
        </div>
      </div>
    )
  }

  renderItemEditor () {
    return (
      <SetupAdditionalItems
        addItem={this.addItem}
        updateItem={this.updateItem}
        removeItem={this.removeItem}
      />
    )
  }

  render () {
    return (
      <div id="setup">
        <div><button onClick={() => {this.context.setStage('home')}}>&lt;- Return To Home</button></div>
        <button onClick={this.toggleEditor}>{this.state.outfitEditor ? 'Edit Additional Items' : 'Edit Outfits'}</button>
        {this.state.outfitEditor ? this.renderOutfitEditor() : this.renderItemEditor()}
      </div>
    )
  }
}

SetupMain.contextType = AppContext;