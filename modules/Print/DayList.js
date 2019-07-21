import React from 'react'
import moment from 'moment'
import Skycons from '../Shared/Skycons'
import OutfitList from './OutfitList'

export default function DayList (props) {

  const outfits = props.day.outfits.map((outfit, index) => {
    return <OutfitList key={index} index={index} outfit={outfit} namedItems={props.namedItems} />
  })
      
  return (
    <div>
      <h2>{moment(props.day.date).format('ddd, MMM Do')}</h2>
        <Skycons
          color='black' 
          icon={props.day.icon.toUpperCase()}
          autoplay={true}
        />
      <p>{props.day.summary}</p>
      <p>High: {props.day.high} Low: {props.day.low}</p>
      {outfits}
    </div>
  )
}