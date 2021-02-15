import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

export default function AdditionalItem (props) {
  const [editing, setEditing] = useState(props.item === 'new item')
  const [name, setName] = useState(props.item)

  function toggleEditing () {
    if (editing) {
      if (name.trim() !== '') {
        props.updateItem(props.id, name)
      }
    }
    setEditing(!editing)
    setName(props.item)
  }
  function updateItemName (ev) {
    setName(ev.target.value)
  }
  function renderName () {
    return <div>
      <span onDoubleClick={toggleEditing}>{props.item}</span>
    </div>
  }
  function deleteItem () {
    props.deleteItem(props.id)
    setEditing(false)
  }
  function autoFocus (ev) {
    ev.target.select()
  }
  function renderEdit () {
    return (
      <div>
        <input
          type="text"
          value={name}
          autoFocus
          onFocus={autoFocus}
          onChange={updateItemName}
          onKeyPress={logEvent}
        />
        <CheckIcon onClick={toggleEditing}/>
        <DeleteIcon icon="delete" onClick={deleteItem} />
      </div>
    )
  }
  function logEvent (ev) {
    if (ev.charCode === 13) {
      toggleEditing()
    }
  }
  return editing ? renderEdit() : renderName()
}