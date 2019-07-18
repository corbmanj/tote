import React, { useState, useRef } from 'react'
import moment from 'moment'
require('es6-promise').polyfill()
require('isomorphic-fetch')

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function Schedule (props) {
  const [dates, setDates] = useState({
    startDate: props.startDate ?  moment(props.startDate).format('YYYY-MM-DD') : null,
    endDate: props.endDate ?  moment(props.startDate).format('YYYY-MM-DD') : null
  })
  const cityState = useRef(props.city || 'City, St')
  
  function updateSchedule () {
    // TODO, if there is already a days array in state, then don't warn before overwriting days
    // let that = this
    let stateObj = {}
    stateObj.city = cityState.current.value
    fetch(`${baseUrl}/api/googleapis/maps/${stateObj.city}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json();
      })
      .then(function(response) {
        const lat = response.results[0].geometry.location.lat
        const lng = response.results[0].geometry.location.lng

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
          fetch(`${baseUrl}/api/darksky/${lat}/${lng}/${newDay.date.unix()}`)
            .then(function(response) {
              if (response.status >= 400) {
                throw new Error('Bad response from server')
              }
              return response.json()
            })
            .then(function(ds) {
              newDay.low = ds.daily.data[0].temperatureMin
              newDay.high = ds.daily.data[0].temperatureMax
              newDay.precip = ds.daily.data[0].precipProbability
              newDay.summary = ds.daily.data[0].summary
              newDay.icon = ds.daily.data[0].icon
              newDay.sunrise = ds.daily.data[0].sunriseTime
              newDay.sunset = ds.daily.data[0].sunsetTime
              newDay.outfits = []
              stateObj.days.push(newDay)
            })
            .then(function () {
              j++
              if (j === stateObj.numDays) {
                stateObj.days = stateObj.days.sort(function(a, b) {
                  return a.date.isBefore(b.date) ? -1 : 1
                })
                stateObj.currentStage = 'select'
                props.updateState(stateObj)
              }
            })
          i++
        }
      })
  }
  function updateDate (ev) {
    setDates({...dates, [ev.target.name]: moment(ev.target.value)})
  }

  function handleKeyPress (ev) {
    if (ev.charCode === 13 && dates.endDate.isAfter(dates.startDate) && props.city) {
      updateSchedule()
    }

  }
  function autofocus (e) {
    e.target.select()
  }
  function renderButtons () {
    if (props.days) {
      let stateObj = {}
      stateObj.currentStage = 'select'
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
            onClick={() => props.updateState(stateObj)}
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
          defaultValue={props.city}
          onFocus={autofocus}
        />
      </div>
      {renderButtons()}
    </div>
  )
}
