import React from 'react'
import PropTypes from 'prop-types'

export default function CheckboxSection(props) {
  const { toggle, disabled, outfit } = props

  function toggleItem(ev) {
    toggle(ev.target.value, ev.target.checked)
  }

  const outfitItems = outfit.items || []

  const checkboxes = outfitItems.map((item, key) => {
    return (
      <label key={key} className="checkbox-input">
        <input
          type="checkbox"
          value={item.type}
          defaultChecked={!item.isNotIncluded}
          onClick={toggleItem}
          disabled={disabled}
        />
        {item.type}
      </label>
    )
  })

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
}
