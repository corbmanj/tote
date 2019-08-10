import React, { useState } from 'react'
import moment from 'moment'
import { Icon } from '@blueprintjs/core'
import OutfitSection from './OutfitSection'
import Skycons from '../Shared/Skycons'
import { Collapse } from '@blueprintjs/core'
import cloneDeep from 'lodash/cloneDeep'

export default function DaySection (props) {
  const [isOpen, setIsOpen] = useState(props.index === 0)
  const [activeOutfit, setActiveOutfit] = useState()
  function toggleOpen () {
    setIsOpen(!isOpen)
  }

  function updateDay (key, outfit, inc) {
    let tempState = [...props.day.outfits]
    const outfitCopy = cloneDeep(outfit)
    if (inc === 0) {
      tempState.splice(key, 1)
    } else {
      tempState[key].items = outfitCopy.items
      tempState[key].name = outfitCopy.name
      tempState[key].type = outfitCopy.type
    }
    // const outfitCopy = cloneDeep(outfit)
    // if (inc === 1) {
    //   tempState[key].items = outfit.items
    //   tempState[key].name = outfit.name
    //   tempState[key].type = outfit.type
    // } else if (inc === -1) {
    //   tempState[key].items = outfit.items
    //   tempState[key].name = outfit.name
    //   tempState[key].type = outfit.type
    // } else if (inc === 0) {
    //   tempState.splice(key, 1)
    // }
    // console.log('index', props.index, 'key', key, 'outfitCopy', outfitCopy, 'inc', inc)
    props.updateTote(props.index, key, outfitCopy, inc)
  }
  function updateName (key, name) {
    let tempState = props.day.outfits
    tempState[key].realName = name
    props.updateOutfitName(props.index, key, name)
  }
  function addOutfit () {
    const num = props.day.outfits.length + 1 || 1
    const newOutfit = {
      id: num,
      realName: 'Outfit ' + num
    }
    let tempOutfits = props.day.outfits
    tempOutfits.push(newOutfit)
    setActiveOutfit(newOutfit.id)
  }
  function updateActiveOutfit (index) {
    setActiveOutfit(index)
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
        activeOutfit={activeOutfit || 1}
        updateActiveOutfit={updateActiveOutfit}
        renderCopyModal={props.renderCopyModal}
      />
    )
  })
  const carotClass = isOpen ? 'chevron-down' : 'chevron-right'
  return (
    <li>
      <h4 onClick={toggleOpen}>
        <Icon icon={carotClass} />
        {moment(props.day.date).format('ddd, MMM Do YYYY')}
        <Skycons
          color='black' 
          icon={props.day.icon.toUpperCase()}
          autoplay={true}
        />
      </h4>
      <Collapse isOpen={isOpen}>
        <p>{props.day.summary}</p>
        <p>High: {props.day.high} &deg;F Low: {props.day.low}&deg; F</p>
        <ul className="sectionList">
          {outfitArray}
        </ul>
        <button onClick={addOutfit}>Add Outfit</button>
        <hr />
      </Collapse>
    </li>
  )
}