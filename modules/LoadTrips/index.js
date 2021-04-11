import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '../Shared/ConfirmModal'
import { AppContext } from '../AppState';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function LoadTrips () {
  const context = useContext(AppContext)
  const history = useHistory()
  const [state, setState] = useState({})
  
  useEffect(() => {
    context.getTripList()
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
    const newList = context.tripList
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
    const tripList = context.tripList.sort((a,b) => {
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
  function DeleteTripModal ({ isOpen }) {
    if (!isOpen) {
      return null
    }
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
      <DeleteTripModal isOpen={state.showModal} />
      <ol>
        {context.tripList && renderTripList()}
      </ol>
    </div>
  )
}
