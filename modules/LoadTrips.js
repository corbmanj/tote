import React from 'react'
import moment from 'moment'
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default React.createClass({
  componentWillMount () {
    this.getTripList()
  },
  getInitialState() {
    return {}
  },
  getTripList () {
    let that = this
    fetch(`${baseUrl}/db/tote/getTrips/${this.props.userId}`, {
      method: "GET",
    })
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(function (data) {
        that.setState({tripList: data})
      });
  },
  loadTrip (trip) {
    let ev = {}
    ev.target = {}
    ev.target.value = 'schedule'
    this.props.updateState(trip)
    this.props.updateStage(ev)
  },
  renderTripList () {
    const tripList = this.state.tripList.sort((a,b) => {
      if (a.startDate > b.startDate) {
        return -1
      } else if (a.startDate < b.startDate) {
        return 1
      } else { return 0 }
    }).map((trip, index) => {
      if (trip) {
        return (
          <li key={index} onClick={() => this.loadTrip(trip)} className="card">
            <p>City: {trip.city}</p>
            <p>Start: {moment(trip.startDate).format('dddd, MMMM Do')}</p>
            <p>End: {moment(trip.endDate).format('dddd, MMMM Do')}</p>
          </li>
        )
      }
    })
    return tripList
  },
  render () {
    return (
      <ol>
        {this.state.tripList && this.renderTripList()}
      </ol>
    )
  }
})