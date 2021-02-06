import React, { useState, useContext } from 'react'
import moment from 'moment'
import { AppContext } from '../AppState'
import OutfitSection from './OutfitSection'
import Skycons from '../Shared/Skycons'
import cloneDeep from 'lodash.clonedeep'

export default function DaySection (props) {
  const { index, day, updateTote, updateOutfitName, renderCopyModal } = props
  const [isOpen, setIsOpen] = useState(index === 0)
  const context = useContext(AppContext)
  function toggleOpen () {
    setIsOpen(!isOpen)
  }

  function updateDay (key, outfit, inc) {
    // TODO: maybe use context.setOutfit
    let tempState = [...day.outfits]
    const outfitCopy = cloneDeep(outfit)
    tempState[key].items = outfitCopy.items
    tempState[key].name = outfitCopy.name
    tempState[key].type = outfitCopy.type
    updateTote(index, key, outfitCopy, inc)
  }
  function updateName (key, name) {
    let tempState = day.outfits
    tempState[key].realName = name
    updateOutfitName(index, key, name)
  }
  function addOutfit () {
    context.addOutfit(index)
  }
  const outfitArray = day.outfits.map((outfit, outfitIndex) => {
    return (
      <OutfitSection
        key={outfitIndex}
        index={outfitIndex}
        dayIndex={index}
        outfit={outfit}
        updateDay={updateDay}
        updateName={updateName}
        renderCopyModal={renderCopyModal}
      />
    )
  })
  return (
    <div className="day-section">
      <div className="day-details">
        {moment(day.date).format('ddd, MMM Do')}
        <Skycons
          color='black' 
          icon={day.icon.toUpperCase()}
          autoplay={true}
        />
        <div>{day.summary}</div>
        <div className="day-temps">
          <div>High: {day.high} &deg;F</div>
          <div>Low: {day.low}&deg; F</div>
        </div>
      </div>
      <div className="outfit-list">
        {outfitArray}
        <button className="add-outfit" onClick={addOutfit}>+ Outfit</button>
      </div>
    </div>
  )
}