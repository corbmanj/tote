import React, {Component} from 'react'
import { AppContext } from './AppState';
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class GetStarted extends Component {
  componentDidMount () {
  const that = this
    fetch(`${baseUrl}/db/userItems/${that.context.userId}`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json();
      })
      .then(function (response) {
        if (!response.outfits.length) { // user has not yet set up outfits
          that.context.setStage('setup')
        }
        else {
          // that.props.updateStateNoSave({outfitTypes: response.outfits, additionalItems: response.additionalItems})
          that.context.setOutfitTypes(response.outfits)
          that.context.setAdditionalItems(response.additionalItems)
        }
      })
  }

  initializeTrip = (ev) => {
    const newStage = ev.target.value
    // let stateObj = {}
    const that = this
    fetch(`${baseUrl}/db/tote/newTrip/${that.context.userId}`, {
      method: "POST",
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(function (data) {
        that.context.clearTote()
        that.context.setTripId(data.id)
        that.context.setStage(newStage)
      });
    // this.context.setStage(newStage)
  }
  updateStage = (ev) => {
    this.context.setStage(ev.target.value)
  }
  render () {
    return (
      <div>
        <button value='schedule' onClick={this.initializeTrip}>Plan a New Trip</button>
        <button value='load' onClick={this.updateStage}>Load a Saved Trip</button>
        <button value='setup' onClick={this.updateStage}>Edit User Settings</button>
      </div>
    )
  }
}

GetStarted.contextType = AppContext;