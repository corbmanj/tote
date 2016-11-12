import React from 'react'
import moment from 'moment'
var Client = require('node-rest-client').Client;

var client = new Client();

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
    // direct way
    var args = {
      headers: { "Content-Type": "application/json"}
    };
    client.get('https://api.darksky.net/forecast/d309e32e8c63522fabf78f33fac01ca4/30.2672,-97.7431', args, function (data, response) {
      // parsed response body as js object
      console.log(data);
      // raw response
      console.log(response);
    });

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
          Start Date:
          <input
            defaultValue={this.state.startDate ? this.state.startDate.format('YYYY-MM-DD') : null}
            type="date"
            name="startDate"
            onChange={this.updateDate}
          />
          <br />
            End Date:
          <input
            defaultValue={this.state.endDate ? this.state.endDate.format('YYYY-MM-DD') : null}
            type="date" name="endDate"
            onChange={this.updateDate}
          />
          <br />
          Destination: <input type="text" placeholder="City, St" />
        </form>
        <button value='select' onClick={this.updateSchedule}>Select Outfits</button>
      </div>
      )
  }
})