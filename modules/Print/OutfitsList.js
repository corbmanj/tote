import React from 'react'
import DayList from './DayList'

export default function OutfitsList (props) {
  const days = props.days.map((day, index) => {
    const imageName = day.icon + index
    return <DayList key={index} index={index} image={imageName} day={day} namedItems={props.namedItems}/>
  })
  return (
    <div>
      <h2>Printable Tote</h2>
      {days}
      <div>You're done!</div>
    </div>
    )
}