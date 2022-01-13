import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import axios from 'axios'
import { AppContext } from '../AppState'
import './schedule.scss'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function Schedule () {
  const history = useHistory()
  const context = useContext(AppContext)
  const [dates, setDates] = useState({
    startDate: context.startDate ?  moment(context.startDate) : moment(new Date()),
    endDate: context.endDate ?  moment(context.endDate) : moment(new Date())
  })
  const [cityState, setCityState] = useState(context.city)

  useEffect(() => {
    async function handleReload () {
      await context.handleReload()
      setDates({startDate: moment(context.startDate || new Date()), endDate: moment(context.endDate || new Date())})
      setCityState(context.city)
    }
    handleReload()
  }, [])
  
  
  async function updateSchedule () {
    // if the user hasn't changed the dates from what is in cotext, then just move to the next step
    if (moment(context.startDate).isSame(dates.startDate) && moment(context.endDate).isSame(dates.endDate)) {
      context.setStage('select');
      return;
    }
    // TODO, if there is already a days array in state, then don't warn before overwriting days
    let stateObj = {}
    stateObj.city = cityState
    try {
      const place = await axios.get(`${baseUrl}/api/googleapis/maps/${cityState}`)
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
          await context.setSchedule(
            stateObj.startDate, stateObj.endDate, stateObj.numDays, stateObj.days, cityState
          )
          history.push('/select')
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
    const isDisabled = !cityState
    if (context.days) {
      return (
        <div>
          <button
            className={isDisabled ? 'continue-button disabled' : 'continue-button'}
            onClick={updateSchedule}
            disabled={isDisabled}
          >
            Update Schedule
          </button>
        </div>
      )
    } else {
      return (
        <button
          className={isDisabled ? 'continue-button disabled' : 'continue-button'}
          value="select"
          onClick={updateSchedule}
          disabled={isDisabled}
        >
          Continue
        </button>
      )
    }
  }
  function updateCityState (ev) {
    setCityState(ev.target.value)
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
          className="city-input"
          placeholder="City, St"
          value={cityState || ''}
          type="text"
          onFocus={autofocus}
          onChange={updateCityState}
        />
      {renderButtons()}
    </div>
  )
}
