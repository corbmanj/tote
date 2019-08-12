import React, { Component } from 'react'
import { AppContext } from '../AppState';
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
      outfitEditor: true,
      items: []
    //  outfitTypes: [],
    }
    this.addOutfit = this.addOutfit.bind(this)
  }
  

  componentDidMount () {
    const that = this
    fetch(`${baseUrl}/db/userItems/${this.context.userId}`)
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
        that.setState({ items })
        that.context.setOutfitTypes(response.outfits)
      })
  }
  addOutfit () {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let newType = {type: "new outfit type", items: []}
    let outfitTypes = [...this.context.outfitTypes]
    outfitTypes.push(newType)
    const that = this

    fetch(`${baseUrl}/db/addOutfit/${this.context.userId}`, {
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
        that.context.setOutfitTypes(outfitTypes)
      })

  }
  addItemToOutfit = (outfitIndex) => {
    let newItem = {type: 'new item'}
    let outfitTypes = [...this.context.outfitTypes]
    outfitTypes[outfitIndex].items.push(newItem)
    this.updateDB(outfitTypes[outfitIndex])
    // TOOD: every time you set outfitTypes, set it in the DB and update it in context
    this.context.setOutfitTypes(outfitTypes)
  }
  updateOutfitItem = (outfitIndex, itemIndex, itemType) => {
    let itemObj = this.state.items.find(item => item.type === itemType)
    let tempOutfits = [...this.context.outfitTypes]
    tempOutfits[outfitIndex].items[itemIndex] = itemObj
    this.updateDB(tempOutfits[outfitIndex])
    this.context.setOutfitTypes(tempOutfits)
  }
  addItem = () => {
    this.setState((prevState) => {
      const newItems = [...prevState.items, {type: 'new item', parentType: 'none', dropdown: false}]
      return {items: newItems}
    })


    // let items = [...this.state.items]
    // let newItem = {type: 'new item', parentType: 'none', dropdown: false}
    // items.push(newItem)
    // this.setState({items: items})
  }
  updateItem = (itemIndex, item) => {
    this.setState((prevState) => {
      let newItems = [...prevState.items]
      newItems[itemIndex] = item
      return {items: newItems}
    })
    // let items = [...this.state.items]
    // items[itemIndex] = item
    // this.setState({items: items})
  }
  removeItem = (itemIndex) => {
    this.setState(prevState => {
      const newItems = [...prevState.items]
      newItems.splice(itemIndex, 1)
      return {items: newItems}
    })
  }
  removeOutfitItem = (outfitIndex, itemIndex) => {
    // this.setState(prevState => {
    //   prevState.outfitTypes[outfitIndex].items.splice(itemIndex, 1)
    //   this.updateDB(prevState.outfitTypes[outfitIndex])
    //   return {outfitTypes: prevState.outfitTypes}
    // })
    newOutfits = [...this.context.outfitTypes]
    newOutfits[outfitIndex].item.splice(itemIndex, 1)
    this.updateDB(prevState.outfitTypes[outfitIndex])
    this.context.setOutfitTypes(newOutfits)
  }
  updateDB = (outfit) => {
    const dbOutfit = {type: outfit.type, items: outfit.items}
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${baseUrl}/db/userItems/${this.context.userId}/${outfit.id}`, {
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
    fetch(`${baseUrl}/db/deleteOutfit/${this.context.userId}/${outfitId}`, {
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
        const newOutfits = this.context.outfitTypes.filter(outfit => outfit.id !== response.id)
        this.context.setOutfitTypes(newOutfits)
        // that.setState(prevState => {
        //   const newOutfitList = prevState.outfitTypes.filter(outfit => outfit.id !== response.id)
        //   return {outfitTypes: newOutfitList}
        // })
      })
  }
  updateAdditionalItemCategory = (itemList, id) => {
    var myHeaders = new Headers();
    let sectionToUpdate = this.context.additionalItems.findIndex(section => section.id === id)
    const itemSection = {
      name: this.context.additionalItems[sectionToUpdate].name,
      items: itemList
    }
    myHeaders.append('Content-Type', 'application/json');

    fetch(`${baseUrl}/db/updateAdditionalItems/${this.context.userId}/${id}`, {
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
  addAdditionalItemCategory = (name) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const JSONbody = {
      name: "temporary",
      items: []
    }

    fetch(`${baseUrl}/db/additionalItems/${this.context.userId}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(JSONbody),
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
        <div>{!!this.context.outfitTypes || 'You have not set up your outfits yet!'}</div>
        <div className="flex-container">
          <SetupOutfits
            updateDB={this.updateDB}
            addOutfit={this.addOutfit}
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
        updateAdditionalItemCategory={this.updateAdditionalItemCategory}
        addAdditionalItemCategory={this.addAdditionalItemCategory}
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