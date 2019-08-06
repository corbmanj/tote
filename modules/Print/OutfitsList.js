import React, { useContext } from 'react'
import DayList from './DayList'
import { AppContext } from '../AppState'

export default function OutfitsList () {
  const context = useContext(AppContext)
  const days = context.days.map((day, index) => {
    const imageName = day.icon + index
    return <DayList key={index} index={index} image={imageName} day={day} />
  })
  return (
    <div>
      <h2>Printable Tote</h2>
      {days}
      <div>You&apos;re done!</div>
    </div>
    )
}