import React from 'react'
import moment from 'moment'

export default React.createClass({
  getInitialState () {
    return {
      numDays: 0,
      startDate: this.props.startDate ?  this.props.startDate.format('YYYY-MM-DD') : null,
      endDate: this.props.endDate ? this.props.endDate.format('YYYY-MM-DD') : null,
    }
  },
  dateToString (dateObj) {
    if (dateObj) {
      return `${dateObj.getFullYear()}-${dateObj.getMonth() < 9 ? '0' : ''}${dateObj.getMonth()+1}-${dateObj.getDate() < 10 ? '0' : ''}${dateObj.getDate()}`
    } else { return null }
  },
  stringToDate (dateStr) {
    if (typeof dateStr === 'string') {
      return new Date(dateStr)
    } else { return dateStr }
  },
  updateSchedule () {
    let stateObj = {}
    stateObj.startDate = moment(this.state.startDate)
    stateObj.endDate = moment(this.state.endDate)
    stateObj.days = []
    stateObj.numDays = stateObj.endDate.diff(stateObj.startDate, 'd')+1
    let i = 0
    while (i < stateObj.numDays) {
      let newDay = {
        date: moment(stateObj.startDate).add(i, 'd'),
        low: 55,
        high: 78,
        precip: 10,
        outfits: []
      }
      stateObj.days.push(newDay)
      i++
    }
    stateObj.currentStage = 'select'
    this.props.updateState(stateObj)
  },
  updateDate (ev) {
    let obj = {}
    obj[ev.target.name] = moment(ev.target.value)
    this.setState(obj)
  },
  render() {
    return (
      <div>  
        <h2>Schedule</h2>
        <form>
          Start Date: <input defaultValue={this.state.startDate} type="date" name="startDate" onChange={this.updateDate} />
          <br />
          End Date: <input defaultValue={this.state.endDate} type="date" name="endDate" onChange={this.updateDate} />
          <br />
          Destination: <input type="text" placeholder="City, St" />
        </form>
        <button value='select' onClick={this.updateSchedule}>Select Outfits</button>
      </div>
      )
  }
})