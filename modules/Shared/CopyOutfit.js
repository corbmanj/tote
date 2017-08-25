import React from 'react'
import moment from 'moment'

export default function CopyOutfit (props) {
  const updateChecked = (ev) => {
    props.updateCopyArray(ev.target.value, ev.target.checked)
  }
  const days = props.days.map((day, index) => {
    return <li key={index}><label><input type="checkbox" value={index} onChange={updateChecked}/>{moment(day.date).format('ddd, MMM Do')}</label></li>
  })

  return <ul className="sectionList">{days}</ul>
}