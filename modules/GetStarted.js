import React from 'react'
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function GetStarted (props) {
  const initializeTrip = (ev) => {
    let stateObj = {}
    fetch(`${baseUrl}/db/tote/newTrip/${props.userId}`, {
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
        props.updateState(stateObj)
      });
    props.updateStage(ev)
  }

  return (
    <div>
      <button value='schedule' onClick={initializeTrip}>Plan a New Trip</button>
      <button value='load' onClick={props.updateStage}>Load a Saved Trip</button>
      <button value='setup' onClick={props.updateStage}>Edit User Settings</button>
    </div>
  )
}
