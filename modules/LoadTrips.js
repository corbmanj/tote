import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'
import Modal from './Shared/ConfirmModal'
import { AppContext } from './AppState';

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
  async getTripList () {
    try { 
      const response = await axios.get(`${baseUrl}/db/tote/getTrips/${this.context.userId}`)
      this.setState({ tripList: response.data })
    } catch (err)  {
      console.error(err)
    }
  }
  loadTrip (trip) {
    this.context.setTrip(trip)
  }
  handleDeleteClick = (ev, trip) => {
    ev.stopPropagation()
    this.setState({showModal: true, modalTrip: trip})
  }
  deleteTrip = async (id) => {
    const newList = this.state.tripList
    const deleteIndex = newList.findIndex(trip => {return trip.tripId === id})
    try { 
      await axios.delete(`${baseUrl}/db/tote/deleteTrip/${id}`)
      newList.splice(deleteIndex, 1)
      this.setState({showModal: false, tripList: newList})
    } catch (err)  {
      console.error(err)
    }
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
      <div className="tripList">
        {this.state.showModal && this.renderModal()}
        <ol>
          {this.state.tripList && this.renderTripList()}
        </ol>
      </div>
    )
  }
}

LoadTrips.contextType = AppContext;
