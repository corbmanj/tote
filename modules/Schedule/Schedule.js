import React, { useState, useRef, useContext } from 'react'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios from 'axios'
import { AppContext } from '../AppState'
import './schedule.css'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function Schedule () {
  const context = useContext(AppContext)
  const [dates, setDates] = useState({
    startDate: context.startDate ?  moment(context.startDate) : moment(new Date()),
    endDate: context.endDate ?  moment(context.endDate) : moment(new Date())
  })
  const cityState = useRef(context.city || 'City, St')
  
  
  async function updateSchedule () {
    // TODO, if there is already a days array in state, then don't warn before overwriting days
    let stateObj = {}
    stateObj.city = cityState.current.value
    try {
      const place = await axios.get(`${baseUrl}/api/googleapis/maps/${cityState.current.value}`)
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

  function updateDate ({selection}) {
    const { startDate, endDate } = selection
    setDates({startDate: moment(startDate), endDate: moment(endDate)})
  }

  // function handleSelectDates (...args) {
  //   console.log('arg', args)
  // }

  // function handleKeyPress (ev) {
  //   if (ev.charCode === 13 && dates.endDate.isAfter(dates.startDate) && context.city) {
  //     updateSchedule()
  //   }

  // }
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
            Set New Dates
          </button>
          <button
            value='select'
            onClick={() => context.setStage('select')}
            disabled={dates.startDate && dates.endDate ? moment(dates.startDate).isAfter(moment(dates.endDate)) : true}
          >
            Keep Previous Dates
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
          Continue
        </button>
      )
    }
  }
  return (
    <div className="schedule">
      <h1>When is your trip?</h1>
        <DateRange
          onChange={updateDate}
          ranges={[{
            startDate: dates.startDate.toDate(),
            endDate: dates.endDate.toDate(),
            key:"selection"
          }]}
        />
        <h1>Where are you going?</h1>
        <input
          ref={cityState}
          placeholder="City, St"
          type="text"
          defaultValue={context.city}
          onFocus={autofocus}
        />
      {renderButtons()}
    </div>
  )
}
