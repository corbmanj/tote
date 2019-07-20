import React, { Component } from 'react'
import SetupOutfits from './SetupOutfits'
import SetupItems from './SetupItems'
import SetupAdditionalItems from './SetupAdditionalItems'
// import outfitTypes from "../Select/outfitTypes";

require('es6-promise').polyfill()
require('isomorphic-fetch')
const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class SetupMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
     outfitTypes: [], items: [], outfitEditor: true
    }
    this.addOutfit = this.addOutfit.bind(this)
  }
  

  componentDidlMount () {
    const that = this
    fetch(`${baseUrl}/db/userItems/${this.props.user}`)
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
  addOutfit () {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let newType = {type: "new outfit type", items: []}
    let outfitTypes = this.state.outfitTypes
    outfitTypes.push(newType)
    const that = this

    fetch(`${baseUrl}/db/addOutfit/${this.props.user}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newType),
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
        outfitTypes[outfitTypes.length - 1].id = response.id
        that.setState({outfitTypes})
      })

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
  removeItem = (itemIndex) => {
    this.setState(prevState => {
      prevState.items.splice(itemIndex, 1)
      return {items: prevState.items}
    })
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

    fetch(`${baseUrl}/db/userItems/${this.props.user}/${outfit.id}`, {
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
  removeOutfit = (outfitId) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const that = this
    fetch(`${baseUrl}/db/deleteOutfit/${this.props.user}/${outfitId}`, {
      method: 'DELETE',
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
        that.setState(prevState => {
          const newOutfitList = prevState.outfitTypes.filter(outfit => outfit.id !== response.id)
          return {outfitTypes: newOutfitList}
        })
      })
  }
  updateAdditionalItemCategory = (itemList, id) => {
    var myHeaders = new Headers();
    let sectionToUpdate = this.props.additionalItems.findIndex(section => section.id === id)
    console.log(sectionToUpdate, id, itemList)
    const itemSection = {
      name: this.props.additionalItems[sectionToUpdate].name,
      items: itemList
    }
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${baseUrl}/db/updateAdditionalItems/${this.props.user}/${id}`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(itemSection),
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
  toggleEditor = () => {
    this.setState(prevState => {return {outfitEditor: !prevState.outfitEditor}})
  }
  renderOutfitEditor () {
    return (
      <div>
        <div>{!!this.state.outfitTypes || 'You have not set up your outfits yet!'}</div>
        <div className="flex-container">
          <SetupOutfits
            updateDB={this.updateDB}
            addOutfit={this.addOutfit}
            types={this.state.outfitTypes}
            addItem={this.addItemToOutfit}
            updateOutfitItem={this.updateOutfitItem}
            removeOutfitItem={this.removeOutfitItem}
            removeOutfit={this.removeOutfit}
            items={this.state.items}
            />

          <SetupItems
            items={this.state.items}
            addItem={this.addItem}
            updateItem={this.updateItem}
            removeItem={this.removeItem}
            outfits={this.state.outfitTypes}
          />
        </div>
      </div>
    )
  }

  renderItemEditor () {
    return (
      <SetupAdditionalItems
        sections={this.props.additionalItems}
        addItem={this.addItem}
        updateItem={this.updateItem}
        removeItem={this.removeItem}
        updateAdditionalItemCategory={this.updateAdditionalItemCategory}
      />
    )
  }

  render () {
    return (
      <div id="setup">
        <div><button value='home' onClick={(ev) => {this.props.updateStage(ev)}}>&lt;- Return To Home</button></div>
        <button onClick={this.toggleEditor}>{this.state.outfitEditor ? 'Edit Additional Items' : 'Edit Outfits'}</button>
        {this.state.outfitEditor ? this.renderOutfitEditor() : this.renderItemEditor()}
      </div>
    )
  }
}