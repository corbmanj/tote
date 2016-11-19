import React from 'react'
import DayList from './DayList'

export default React.createClass({
  render() {
    const days = this.props.days.map((day, index) => {
      return <DayList key={index} index={index} day={day} />
    })
    return (
      <div>  
        <h2>Printable Tote</h2>
        {days}
        <div>You're done!</div>
      </div>
      )
  }
})