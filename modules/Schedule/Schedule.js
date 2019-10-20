import React, { useState, useRef, useContext } from 'react'
import moment from 'moment'
import axios from 'axios'
// require('es6-promise').polyfill()
// require('isomorphic-fetch')
// import fetch from 'isomorphic-fetch'

import { AppContext } from '../AppState'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function Schedule () {
  const context = useContext(AppContext)
  const [dates, setDates] = useState({
    startDate: context.startDate ?  moment(context.startDate).format('YYYY-MM-DD') : null,
    endDate: context.endDate ?  moment(context.endDate).format('YYYY-MM-DD') : null
  })
  const cityState = useRef(context.city || 'City, St')
  
  
  async function updateSchedule () {
    // TODO, if there is already a days array in state, then don't warn before overwriting days
    let stateObj = {}
    stateObj.city = cityState.current.value
    try {
      const place = await axios.get(`${baseUrl}/api/googleapis/maps/${cityState.current.value}`)
      console.log('this is the place', place);
      const lat = place.data.results[0].geometry.location.lat
      const lng = place.data.results[0].geometry.location.lng

      stateObj.startDate = moment(dates.startDate)
      stateObj.endDate = moment(dates.endDate)
      stateObj.days = []
      stateObj.numDays = stateObj.endDate.diff(stateObj.startDate, 'd')+1
      let i = 0
      let j = 0
      while (i < stateObj.numDays) {
        let newDay = {
          date: moment(stateObj.startDate).add(i, 'd')
        }
        const { daily } = (await axios.get(`${baseUrl}/api/darksky/${lat}/${lng}/${newDay.date.unix()}`)).data
        console.log('ds', daily)
        newDay.low = daily.data[0].temperatureMin
        newDay.high = daily.data[0].temperatureMax
        newDay.precip = daily.data[0].precipProbability
        newDay.summary = daily.data[0].summary
        newDay.icon = daily.data[0].icon
        newDay.sunrise = daily.data[0].sunriseTime
        newDay.sunset = daily.data[0].sunsetTime
        newDay.outfits = []
        stateObj.days.push(newDay)
        j++
        if (j === stateObj.numDays) {
          stateObj.days = stateObj.days.sort(function(a, b) {
            return a.date.isBefore(b.date) ? -1 : 1
          })
          context.setSchedule(
            stateObj.startDate, stateObj.endDate, stateObj.numDays, stateObj.days, cityState.current.value
          )
        }
        i++
      }
    } catch (err) {
      console.error(err)
    }
    
  }

  function updateDate (ev) {
    setDates({...dates, [ev.target.name]: moment(ev.target.value)})
  }

  function handleKeyPress (ev) {
    if (ev.charCode === 13 && dates.endDate.isAfter(dates.startDate) && context.city) {
      updateSchedule()
    }

  }
  function autofocus (e) {
    e.target.select()
  }
  function renderButtons () {
    if (context.days) {
      return (
        <div>
          <button
            onClick={updateSchedule}
            disabled={dates.startDate && dates.endDate ? moment(dates.startDate).isAfter(moment(dates.endDate)) : true}
          >
            Reset Schedule
          </button>
          <button
            value='select'
            onClick={() => context.setStage('select')}
            disabled={dates.startDate && dates.endDate ? moment(dates.startDate).isAfter(moment(dates.endDate)) : true}
          >
            Move to Select Outfits
          </button>
        </div>
      )
    } else {
      return (
        <button
          value='select'
          onClick={updateSchedule}
          disabled={dates.startDate && dates.endDate ? moment(dates.startDate).isAfter(moment(dates.endDate)) : true}
        >
          Select Outfits
        </button>
      )
    }
  }
  return (
    <div>
      <h2 className="header">Schedule</h2>
      <div onKeyPress={handleKeyPress}>
        Start Date:
        <input
          defaultValue={dates.startDate ? moment(dates.startDate).format('YYYY-MM-DD') : null}
          type="date"
          name="startDate"
          onChange={updateDate}
        />
        <br />
          End Date:
        <input
          defaultValue={dates.endDate ? moment(dates.endDate).format('YYYY-MM-DD') : null}
          type="date" name="endDate"
          onChange={updateDate}
        />
        <br />
        Destination:
        <input
          ref={cityState}
          placeholder="City, St"
          type="text"
          defaultValue={context.city}
          onFocus={autofocus}
        />
      </div>
      {renderButtons()}
    </div>
  )
}
