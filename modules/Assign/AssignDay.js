import React, { useState } from 'react'
import moment from 'moment'
import AssignOutfit from './AssignOutfit'
import Skycons from '../Shared/Skycons'

export default function AssignDay (props) {
  const [isOpen, setIsOpen] = useState(props.index === 0)

  function toggleOpen () {
    setIsOpen(!isOpen)
  }

  const outfits = props.day.outfits.map((outfit, index) => {
    return (
      <AssignOutfit
        key={index}
        dayIndex={props.index}
        index={index}
        outfit={outfit}
        updateNamedItems={props.updateNamedItems}
        updateNamedItemInAllOutfits={props.updateNamedItemInAllOutfits}
      />
    )
  })

  const carotClass = isOpen ? 'chevron-down' : 'chevron-right'

  return (
    <div className="day-section">
      <div className="day-details">
        {moment(props.day.date).format('ddd, MMM Do YYYY')}
        <Skycons
          color='black' 
          icon={props.day.icon.toUpperCase()}
          autoplay={true}
        />
        <div>{props.day.summary}</div>
        <div className="day-temps">
          <div>High: {props.day.high} &deg;F</div>
          <div>Low: {props.day.low}&deg; F</div>
        </div>
      </div>
      <div className="outfit-list">
        {outfits}
      </div>
    </div>
  )
}