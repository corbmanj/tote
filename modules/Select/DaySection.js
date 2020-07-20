import React, { useState, useContext } from 'react'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'
import { AppContext } from '../AppState'
import OutfitSection from './OutfitSection'
import Skycons from '../Shared/Skycons'
import { Collapse } from '@blueprintjs/core'
import cloneDeep from 'lodash.clonedeep'

export default function DaySection (props) {
  const [isOpen, setIsOpen] = useState(props.index === 0)
  const context = useContext(AppContext)
  function toggleOpen () {
    setIsOpen(!isOpen)
  }

  function updateDay (key, outfit, inc) {
    // TODO: maybe use context.setOutfit
    let tempState = [...props.day.outfits]
    const outfitCopy = cloneDeep(outfit)
    tempState[key].items = outfitCopy.items
    tempState[key].name = outfitCopy.name
    tempState[key].type = outfitCopy.type
    props.updateTote(props.index, key, outfitCopy, inc)
  }
  function updateName (key, name) {
    let tempState = props.day.outfits
    tempState[key].realName = name
    props.updateOutfitName(props.index, key, name)
  }
  function addOutfit () {
    context.addOutfit(props.index)
  }
  const outfitArray = props.day.outfits.map((outfit, index) => {
    return (
      <OutfitSection
        key={index}
        index={index}
        dayIndex={props.index}
        outfit={outfit}
        updateDay={updateDay}
        updateName={updateName}
        renderCopyModal={props.renderCopyModal}
      />
    )
  })
  const carotClass = isOpen ? 'chevron-down' : 'chevron-right'
  return (
    <li className="day-section">
      <div className="day-details">
        {/* <Icon icon={carotClass} /> */}
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
        {outfitArray}
        <button className="add-outfit" onClick={addOutfit}>+ Outfit</button>
      </div>
      
    </li>
  )
}