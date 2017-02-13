import React from 'react'
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default React.createClass({
  initializeTrip (ev) {
    let that = this
    let stateObj = {}
    fetch(`${baseUrl}/db/tote/newTrip/${this.props.userId}`, {
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
  },
  render () {
    return (
      <div>
        <button value='schedule' onClick={this.initializeTrip}>Plan a New Trip</button>
        <button value='load' onClick={this.props.updateStage}>Load a Saved Trip</button>
      </div>
    )
  }
})
