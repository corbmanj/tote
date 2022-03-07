import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash.clonedeep'
import { AppContext } from '../AppState'
import OutfitSection from './OutfitSection'
import { DayHeader } from '../Shared/DayHeader'

export default function DaySection(props) {
  const { index, day, updateTote, updateOutfitName, renderCopyModal } = props
  const context = useContext(AppContext)

  function updateDay(key, outfit, inc) {
    // TODO: maybe use context.setOutfit
    let tempState = [...day.outfits]
    const outfitCopy = cloneDeep(outfit)
    tempState[key].items = outfitCopy.items
    tempState[key].name = outfitCopy.name
    tempState[key].type = outfitCopy.type
    updateTote(index, key, outfitCopy, inc)
  }
  function updateName(key, name) {
    let tempState = day.outfits
    tempState[key].name = name
    updateOutfitName(index, key, name)
  }
  function addOutfit() {
    context.addOutfit(index)
  }

  return (
    <DayHeader day={day}>
      {day.outfits.map((item, outfitIndex) => {
        const outfit = context.days[index].outfits[outfitIndex]
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
      )})}
      <button className="add-outfit" onClick={addOutfit}>+ Outfit</button>
    </DayHeader>
  )
}

DaySection.propTypes = {
  index: PropTypes.number,
  day: PropTypes.shape({
    outfits: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.number,
      expanded: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.shape({
        dropdown: PropTypes.bool,
        parentType: PropTypes.string,
        type: PropTypes.string,
      })),
    }))
  }),
  updateTote: PropTypes.func,
  updateOutfitName: PropTypes.func,
  renderCopyModal: PropTypes.func,
}