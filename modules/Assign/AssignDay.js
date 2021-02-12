import React from 'react'
import PropTypes from 'prop-types'
import AssignOutfit from './AssignOutfit'
import { DayHeader } from '../Shared/DayHeader'

export default function AssignDay (props) {
  const { day, index, updateNamedItems, updateNamedItemInAllOutfits } = props

  const outfits = day.outfits.map((outfit, outfitIndex) => {
    return (
      <AssignOutfit
        key={outfitIndex}
        dayIndex={index}
        index={outfitIndex}
        outfit={outfit}
        updateNamedItems={updateNamedItems}
        updateNamedItemInAllOutfits={updateNamedItemInAllOutfits}
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
    outfits: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      realName: PropTypes.string,
      id: PropTypes.number,
      expanded: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.shape({
        dropdown: PropTypes.bool,
        parentType: PropTypes.string,
        type: PropTypes.string,
      })),
    }))
  }),
  index: PropTypes.number,
  updateNamedItems: PropTypes.func,
  updateNamedItemInAllOutfits: PropTypes.func,
}
