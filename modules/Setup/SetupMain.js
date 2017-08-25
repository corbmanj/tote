import React, {Component} from 'react'
import SetupOutfits from './SetupOutfits'
import SetupItems from './SetupItems'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export default class SetupMain extends Component {
  state = {
    outfitTypes: [], items: []
  }
  baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

  componentWillMount () {
    const that = this
    fetch(`${this.baseUrl}/db/userItems/${this.props.user}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json();
      })
      .then(function(response) {
        const items  = []
        response.outfits.forEach(outfit => {
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
        that.setState({outfitTypes: response.outfits, items})
      })
  }
  addOutfit = () => {
    let newType = {type: "new outfit type", items: []}
    let outfitTypes = this.state.outfitTypes
    outfitTypes.push(newType)
    this.setState({outfitTypes: outfitTypes})
  }
  addItemToOutfit = (outfitIndex) => {
    let newItem = {type: 'new item'}
    let outfitTypes = this.state.outfitTypes
    outfitTypes[outfitIndex].items.push(newItem)
    this.updateDB(outfitTypes[outfitIndex])
    this.setState(outfitTypes)
  }
  updateOutfitItem = (outfitIndex, itemIndex, itemType) => {
    let itemObj = this.state.items.find(item => item.type === itemType)
    let tempOutfits = this.state.outfitTypes
    tempOutfits[outfitIndex].items[itemIndex] = itemObj
    this.updateDB(tempOutfits[outfitIndex])
    this.setState({outfitTypes: tempOutfits})
  }
  addItem = () => {
    let items = this.state.items
    let newItem = {type: 'new item', parentType: 'none', dropdown: false}
    items.push(newItem)
    this.setState({items: items})
  }
  updateItem = (itemIndex, item) => {
    let items = this.state.items
    items[itemIndex] = item
    this.setState({items: items})
  }
  removeOutfitItem = (outfitIndex, itemIndex) => {
    this.setState(prevState => {
      prevState.outfitTypes[outfitIndex].items.splice(itemIndex, 1)
      this.updateDB(prevState.outfitTypes[outfitIndex])
      return {outfitTypes: prevState.outfitTypes}
    })
  }
  updateDB = (outfit) => {
    const dbOutfit = {type: outfit.type, items: outfit.items}
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${this.baseUrl}/db/userItems/${this.props.user}/${outfit.id}`, {
      method: 'PUT',
      body: JSON.stringify(dbOutfit),
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(function(response) {
        console.log(response)
      })
  }

  render () {
    return (
      <div>
        <div>{!!this.state.outfitTypes || 'You have not set up your outfits yet!'}</div>
        <div className="flex-container">

          <SetupOutfits
            addOutfit={this.addOutfit}
            types={this.state.outfitTypes}
            addItem={this.addItemToOutfit}
            updateOutfitItem={this.updateOutfitItem}
            removeOutfitItem={this.removeOutfitItem}
            items={this.state.items}
          />

          <SetupItems
            items={this.state.items}
            addItem={this.addItem}
            updateItem={this.updateItem}
            outfits={this.state.outfitTypes}
          />

        </div>
      </div>
    )
  }
}