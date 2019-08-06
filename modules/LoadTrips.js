import React, {Component} from 'react'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'
import Modal from './Shared/ConfirmModal'
import { AppContext } from './AppState';
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class LoadTrips extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.getTripList=this.getTripList.bind(this)
    this.loadTrip=this.loadTrip.bind(this)
  }
  componentDidMount () {
    this.getTripList()
  }
  getTripList () {
    let that = this
    fetch(`${baseUrl}/db/tote/getTrips/${this.context.userId}`, {
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
  }
  loadTrip (trip) {
    this.context.setTrip(trip)
  }
  handleDeleteClick = (ev, trip) => {
    ev.stopPropagation()
    this.setState({showModal: true, modalTrip: trip})
  }
  deleteTrip = (id) => {
    let that = this
    const newList = this.state.tripList
    const deleteIndex = newList.findIndex(trip => {return trip.tripId === id})
    fetch(`${baseUrl}/db/tote/deleteTrip/${id}`, {
      method: "DELETE",
    })
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(function (data) {
        newList.splice(deleteIndex, 1)
        that.setState({showModal: false, tripList: newList})
      });
  }
  renderTripList = () => {
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
            <p>City: {trip.city}
              <Icon icon="delete" iconSize={15} onClick={(ev) => this.handleDeleteClick(ev, trip)} />
            </p>
            <p>Start: {moment(trip.startDate).format('dddd, MMMM Do')}</p>
            <p>End: {moment(trip.endDate).format('dddd, MMMM Do')}</p>
          </li>
        )
      }
    })
    return tripList
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  renderModal = () => {
    return <Modal closeModal={this.closeModal} trip={this.state.modalTrip} confirmAction={this.deleteTrip} />
  }
  render () {
    return (
      <div>
        {this.state.showModal && this.renderModal()}
        <ol>
          {this.state.tripList && this.renderTripList()}
        </ol>
      </div>
    )
  }
}

LoadTrips.contextType = AppContext;
