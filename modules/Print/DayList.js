import React from 'react'
import moment from 'moment'
import OutfitList from './OutfitList'
import Skycons from './../../public/skycons'

export default function DayList (props) {
  const icons = new Skycons({'resizeClear': true})
  icons.add(props.image, props.day.icon)
  icons.play()

  const outfits = props.day.outfits.map((outfit, index) => {
    return <OutfitList key={index} index={index} outfit={outfit} namedItems={props.namedItems} />
  })
      
  return (
    <div>
      <h2>{moment(props.day.date).format('ddd, MMM Do')}<canvas id={props.image} width="42" height="42"></canvas></h2>
      <p>{props.day.summary}</p>
      <p>High: {props.day.high} Low: {props.day.low}</p>
      {outfits}
    </div>
  )
}