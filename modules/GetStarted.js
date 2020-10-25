import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from './AppState'
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function GetStarted () {
  const context = useContext(AppContext)
  const history = useHistory()
  useEffect(() => {
    async function getUserItems () {
      const userItems = await axios.get(`${baseUrl}/db/userItems/${context.userId}`)
      if (!userItems.data.outfits.length) { // user has not yet set up outfits
        context.setStage('setup')
        history.push('/setup')
      } else {
        context.setOutfitTypes(userItems.data.outfits)
        context.setAdditionalItems(userItems.data.additionalItems)
      }
    }
    getUserItems()
  }, []
  )

  async function initializeTrip () {
    try {
      const response = await axios.post(`${baseUrl}/db/tote/newTrip/${context.userId}`)
      context.clearTote()
      context.setTripId(response.data.id)
      context.setStage('schedule')
      history.push('/schedule')
    } catch (err) {
      console.error(err)
    }
  }

  function loadTrip () {
    context.setStage('load')
    history.push('/load')
  }

  return (
    <div className="getStarted">
      <button onClick={initializeTrip}>        
        <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.93151 1C4.93151 0.447715 5.37922 0 5.93151 0H12.0685C12.6208 0 13.0685 0.447715 13.0685 1V2.94521C13.0685 3.13018 13.0183 3.30343 12.9307 3.45205H16C17.1046 3.45205 18 4.34749 18 5.45205V14.0274C18 15.132 17.1046 16.0274 16 16.0274H2C0.89543 16.0274 0 15.132 0 14.0274V5.45205C0 4.34748 0.895431 3.45205 2 3.45205H5.06929C4.98173 3.30343 4.93151 3.13018 4.93151 2.94521V1ZM7.16438 0.986301C6.6121 0.986301 6.16438 1.43402 6.16438 1.9863V2.45205C6.16438 3.00434 6.6121 3.45205 7.16438 3.45205H10.8356C11.3879 3.45205 11.8356 3.00434 11.8356 2.45205V1.9863C11.8356 1.43402 11.3879 0.986301 10.8356 0.986301H7.16438Z" fill="#878787"/>
        </svg>
        <span>Plan a New Trip</span>
      </button>
      <button onClick={loadTrip}>
        <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.42713 1C6.42713 0.447715 6.87485 0 7.42713 0H13.5641C14.1164 0 14.5641 0.447715 14.5641 1V2.94521C14.5641 3.13018 14.5139 3.30343 14.4263 3.45205H17.4956C18.4511 3.45205 19.25 4.12203 19.4484 5.01781C20.478 6.61611 20.9721 8.72276 20.6834 10.9446C20.5064 12.3069 20.0559 13.5521 19.4103 14.6072C19.2795 15.0396 19.0063 15.4101 18.6452 15.6642C18.6304 15.6816 18.6156 15.6988 18.6006 15.7161L18.5733 15.7125C18.2623 15.9118 17.8925 16.0274 17.4956 16.0274H3.49563C2.79847 16.0274 2.18462 15.6707 1.82664 15.1298L1.75279 15.1341C0.767685 13.8191 0.125442 12.1148 0.0163637 10.226C-0.121397 7.84063 0.619484 5.64955 1.9057 4.10693L2.02164 4.10024C2.38723 3.70182 2.91226 3.45205 3.49563 3.45205H6.56491C6.47736 3.30343 6.42713 3.13018 6.42713 2.94521V1ZM8.66001 0.986301C8.10773 0.986301 7.66001 1.43402 7.66001 1.9863V2.45205C7.66001 3.00434 8.10773 3.45205 8.66001 3.45205H12.3312C12.8835 3.45205 13.3312 3.00434 13.3312 2.45205V1.9863C13.3312 1.43402 12.8835 0.986301 12.3312 0.986301H8.66001Z" fill="#878787"/>
        </svg>
        <span>Load a Saved Trip</span>
      </button>
    </div>
  )
}
