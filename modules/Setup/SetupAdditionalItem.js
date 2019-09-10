import React, { useState, useRef } from 'react'
import { Icon } from '@blueprintjs/core'

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

  function deleteItem () {
    toggleEditing()
    props.deleteEditedItem(props.item.id)
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
          onKeyPress={handleKeyPress}
        />
        <button onClick={saveItem}>Save</button>
        <Icon icon="delete" iconSize={15} onClick={deleteItem} />
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
