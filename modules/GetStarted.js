import React, {Component} from 'react'
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class GetStarted extends Component {
  componentWillMount () {
  const that = this
    fetch(`${baseUrl}/db/userItems/${that.props.userId}`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json();
      })
      .then(function (response) {
        if (!response.outfits.length) { // user has not yet set up outfits
          that.props.updateState({userId: that.state.userId, currentStage: 'setup'})
        }
        else {
          console.log('here')
          that.props.updateStateNoSave({outfitTypes: response.outfits, additionalItems: response.additionalItems})
        }
      })
  }

  initializeTrip = (ev) => {
    let stateObj = {}
    const that = this
    fetch(`${baseUrl}/db/tote/newTrip/${that.props.userId}`, {
      method: "POST",
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(function (data) {
        stateObj.tripId = data.id
        that.props.updateState(stateObj)
      });
    this.props.updateStage(ev)
  }
  render () {
    return (
      <div>
        <button value='schedule' onClick={this.initializeTrip}>Plan a New Trip</button>
        <button value='load' onClick={this.props.updateStage}>Load a Saved Trip</button>
        <button value='setup' onClick={this.props.updateStage}>Edit User Settings</button>
      </div>
    )
  }
}
