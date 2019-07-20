import React, { useState, useRef } from 'react'

export default function SetupAdditionalItem (props) {
  const [editing, setEditing] = useState(false)
  const name = useRef(props.item.name)

  function toggleEditing () {
    setEditing(!editing)
  }

  function saveItem () {
    toggleEditing()
    props.saveEditedItem(name.current.value, props.item.id)
  }

  function handleKeyPress (ev) {
    if (ev.charCode === 13) {
      saveItem()
    }
  }

  function autoSelect (ev) {
    ev.target.select()
  }

  function renderInput () {
    return (
      <>
        <input
          ref={name}
          defaultValue={props.item.name}
          type="text"
          autoFocus
          onFocus={autoSelect}
          onBlur={saveItem}
          onKeyPress={handleKeyPress}
        />
        <button onClick={saveItem}>Save</button>
      </>
    )
  }

  function renderName () {
    return <li onDoubleClick={toggleEditing}>{props.item.name}</li>
  }

  return (
    <div>
      {editing ? renderInput() : renderName()}
    </div>
  )
}
