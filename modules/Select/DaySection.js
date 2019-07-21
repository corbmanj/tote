import React, { useState } from 'react'
import moment from 'moment'
import OutfitSection from './OutfitSection'
import Skycons from './../../public/skycons'
import { Collapse } from '@blueprintjs/core'
import cloneDeep from 'lodash/cloneDeep'

export default function DaySection (props) {
  const [outfits, setOutfits] = useState(props.day.outfits)
  const [isOpen, setIsOpen] = useState(props.index === 0)
  const [activeOutfit, setActiveOutfit] = useState()
  function toggleOpen () {
    setIsOpen(!isOpen)
  }

  const icons = new Skycons({'resizeClear': true})
  icons.add(props.image, props.day.icon)
  icons.play()

  function updateDay (key, outfit, inc) {
    let tempState = outfits
    const outfitCopy = cloneDeep(outfit)
    if (inc === 1) {
      tempState[key].items = outfitCopy.items
      tempState[key].name = outfitCopy.name
      tempState[key].type = outfitCopy.type
    } else if (inc === -1) {
      tempState[key].items = []
      tempState[key].name = outfitCopy.name
      tempState[key].type = outfitCopy.type
    } else if (inc === 0) {
      tempState.splice(key, 1)
    }
    setOutfits(tempState)
    props.updateTote(props.index, key, outfitCopy, inc)
  }
  function updateName (key, name) {
    let tempState = outfits
    tempState[key].realName = name
    setOutfits(tempState)
    props.updateOutfitName(props.index, key, name)
  }
  function addOutfit () {
    const num = outfits.length + 1 || 1
    const newOutfit = {
      id: num,
      realName: 'Outfit ' + num
    }
    let tempOutfits = outfits
    tempOutfits.push(newOutfit)
    setOutfits(tempOutfits)
    setActiveOutfit(newOutfit.id)
  }
  function updateActiveOutfit (index) {
    setActiveOutfit(index)
  }
  const outfitArray = outfits.map((outfit, index) => {
    return (
      <OutfitSection
        key={index}
        index={index}
        outfit={outfit}
        outfitTypes={props.outfitTypes}
        updateDay={updateDay}
        updateName={updateName}
        activeOutfit={activeOutfit || 1}
        updateActiveOutfit={updateActiveOutfit}
        renderCopyModal={props.renderCopyModal}
      />
    )
  })
  const carotClass = isOpen ? 'pt-icon-standard pt-icon-chevron-down' : 'pt-icon-standard pt-icon-chevron-right'
  return (
    <li>
      <h4 onClick={toggleOpen}>
        <span className={carotClass} />
        {moment(props.day.date).format('ddd, MMM Do YYYY')}
        <canvas id={props.image} width="42" height="42"></canvas>
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