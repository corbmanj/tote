import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import { AppContext } from '../AppState'

function AssignedItem({ allowClick, thing, dayIndex, outfitIndex, selected }) {
  const context = useContext(AppContext)
  function handleClick() {
    context.updateOutfitItem(dayIndex, outfitIndex, thing.parentType, thing.id)
  }

  function noop() { }

  return <Chip size="small" label={thing.name} onClick={allowClick ? handleClick : noop} className="selected-item-chip" color={selected ? 'primary' : 'default'} />
}

export default function OutfitItems({ allowClick, outfitItems, dayIndex, outfitIndex }) {
  const context = useContext(AppContext)
  const namedItems = context.tote.namedItems || []
  const selectedItems = outfitItems
    .map(outfitItem => namedItems.find(item => item.id === outfitItem.id))
    .filter(Boolean)

  return (
    <div className="selected-items">
      <div>
        <div className="existing-items">
          {selectedItems.map(thing => (
            <AssignedItem
              key={`${thing.name}-${outfitIndex}`}
              thing={thing}
              dayIndex={dayIndex}
              outfitIndex={outfitIndex}
              selected
              allowClick={allowClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

AssignedItem.propTypes = {
  allowClick: PropTypes.bool,
  thing: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    parentType: PropTypes.string,
  }),
  dayIndex: PropTypes.number,
  outfitIndex: PropTypes.number,
  selected: PropTypes.bool,
}

OutfitItems.propTypes = {
  allowClick: PropTypes.bool,
  outfitItems: PropTypes.arrayOf(PropTypes.shape({
    dropdown: PropTypes.bool,
    parentType: PropTypes.string,
    type: PropTypes.string,
  })),
  dayIndex: PropTypes.number,
  outfitIndex: PropTypes.number,
}