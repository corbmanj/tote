import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from './Shared/ConfirmModal'
import { AppContext } from './AppState';

const baseUrl = process.env.API_URL || 'http://localhost:8080'

export default function LoadTrips () {
  const context = useContext(AppContext)
  const history = useHistory()
  const [state, setState] = useState({})
  
  useEffect(() => {
    async function getTripList () {
      try { 
        const response = await axios.get(`${baseUrl}/db/tote/getTrips/${context.userId}`)
        setState({ ...state, tripList: response.data })
      } catch (err)  {
        console.error(err)
      }
    }
    getTripList()
  }, [])
  
  async function loadTrip (trip) {
    await context.setTrip(trip)
    history.push('schedule')
  }
  function handleDeleteClick (ev, trip) {
    ev.stopPropagation()
    setState({ ...state, showModal: true, modalTrip: trip })
  }
  async function deleteTrip (id) {
    const newList = state.tripList
    const deleteIndex = newList.findIndex(trip => {return trip.tripId === id})
    try { 
      await axios.delete(`${baseUrl}/db/tote/deleteTrip/${id}`)
      newList.splice(deleteIndex, 1)
      setState({ ...state, showModal: false, tripList: newList })
    } catch (err)  {
      console.error(err)
    }
  }
  function renderTripList () {
    const tripList = state.tripList.sort((a,b) => {
      if (a.startDate > b.startDate) {
        return -1
      } else if (a.startDate < b.startDate) {
        return 1
      } else { return 0 }
    }).map((trip, index) => {
      if (trip) {
        return (
          <li key={index} onClick={() => loadTrip(trip)} className="card">
            <p>City: {trip.city}
              <DeleteIcon onClick={(ev) => handleDeleteClick(ev, trip)} />
            </p>
            <p>Start: {moment(trip.startDate).format('dddd, MMMM Do')}</p>
            <p>End: {moment(trip.endDate).format('dddd, MMMM Do')}</p>
          </li>
        )
      }
    })
    return tripList
  }
  function closeModal () {
    setState({ ...state, showModal: false })
  }
  function renderModal () {
    return (
      <Modal
        closeModal={closeModal}
        trip={state.modalTrip}
        confirmAction={deleteTrip}
      />
    )
  }
  
  return (
    <div className="tripList">
      {state.showModal && renderModal()}
      <ol>
        {state.tripList && renderTripList()}
      </ol>
    </div>
  )
}
