import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  getInitialState: function () {
    return {
      numDays: 0
    }
  },
  updateSchedule: function () {
    let stateObj = {}
    stateObj.startDate = this.state.startDate
    stateObj.endDate = this.state.endDate
    stateObj.days = []
    let i = this.state.startDate.getTime()
    while (i <= this.state.endDate.getTime()) {
      console.log(i)
      let newDay = {
        date: new Date(i),
        low: 55,
        high: 78,
        precip: 10,
        outfits: []
      }
      stateObj.days.push(newDay)
      i += 1000*60*60*24;
    }
    stateObj.numDays = stateObj.days.length
    stateObj.currentStage = 'select'
    this.props.updateState(stateObj)
  },
  updateDate: function (ev) {
    let obj = {}
    obj[ev.target.name] = new Date(ev.target.value)
    this.setState(obj)
    console.log(new Date(ev.target.value))
  },
  render() {
    return (
      <div>  
        <h2>Schedule</h2>
        <form>
          Start Date: <input type="date" name="startDate" onChange={this.updateDate} />
          <br />
          End Date: <input type="date" name="endDate" onChange={this.updateDate} />
          <br />
          Destination: <input type="text" placeholder="City, St" />
        </form>
        <button value='select' onClick={this.updateSchedule}>Select Outfits</button>
      </div>
      )
  }
})