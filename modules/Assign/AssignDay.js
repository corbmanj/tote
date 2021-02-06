import React from 'react'
import PropTypes from 'prop-types'
import AssignOutfit from './AssignOutfit'
import { DayHeader } from '../Shared/DayHeader'

export default function AssignDay (props) {

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

  return (
    <DayHeader day={props.day}>
      {outfits}
    </DayHeader>
  )
}

AssignDay.propTypes = {
  day: PropTypes.shape({
    outfits: PropTypes.arrayOf(PropTypes.string)
  }),
  index: PropTypes.number,
  updateNamedItems: PropTypes.func,
  updateNamedItemInAllOutfits: PropTypes.func,
}
