import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import { AppContext } from '../AppState'

function OutfitItem({type, isNotIncluded, disabled, onClick}) {
  function toggleItem() {
    onClick(type, isNotIncluded)
  }
  return (
    <Chip
      label={type}
      onClick={toggleItem}
      color={isNotIncluded ? 'default' : 'primary'}
      disabled={disabled}
    />
  )

}

export default function CheckboxSection(props) {
  const context = useContext(AppContext)
  const { toggle, disabled, outfitIndex, dayIndex } = props

  const outfitItems = context.days[dayIndex].outfits[outfitIndex].items

  const checkboxes = outfitItems.map((item, key) => (
    <OutfitItem
      key={key}
      type={item.type}
      onClick={toggle}
      disabled={disabled}
      isNotIncluded={!!item.isNotIncluded}
    />
  ))

  return (
    <div className="checkboxes">
      {checkboxes}
    </div>
  )
}

CheckboxSection.propTypes = {
  outfit: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      dropdown: PropTypes.bool,
      parentType: PropTypes.string,
      type: PropTypes.string,
    })),
  }).isRequired,
  disabled: PropTypes.bool,
  toggle: PropTypes.func,
  outfitIndex: PropTypes.number,
  dayIndex: PropTypes.number
}

OutfitItem.propTypes = {
  type: PropTypes.string,
  isNotIncluded: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}
