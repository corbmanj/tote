import React from 'react'
export default function CheckboxSection (props) {
  function toggleItem (ev) {
    props.toggle(ev.target.value, ev.target.checked)
  }
  const checkboxes = props.outfit.items.map((item, key) => {
    return (
        <label key={key} className="checkbox-input">
          <input
            type="checkbox"
            value={item.type}
            defaultChecked={!item.isNotIncluded}
            onClick={toggleItem}
            disabled={props.disabled}
          />
          {item.type}
        </label>
    )
  })
  return <form>{checkboxes}</form>
}