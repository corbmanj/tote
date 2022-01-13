import React, { useState, useRef } from 'react'
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Item (props) {
  const [editing, setEditing] = useState(false)
  const nameInput = useRef(null)

  function toggleEditing () {
    if (editing) {
      if (nameInput.current.value && !(nameInput.current.value.trim() === '')) {
        props.updateNamedItemInAllOutfits(props.item.id, nameInput.current.value)
      }
    }
    setEditing(!editing)
  }

  function renderName () {
    return <li onDoubleClick={toggleEditing}>{props.item.name}</li>
  }

  function deleteItem () {
    props.deleteNamedItem(props.item.id)
    setEditing(false)
  }

  function autoSelect (ev) {
    ev.target.select()
  }

  function handleKeyPress (ev) {
    if (ev.charCode === 13) {
      toggleEditing()
    }
  }

  function renderEdit () {
    return (
      <li>
        <input
          ref={nameInput}
          type="text"
          defaultValue={props.item.name}
          autoFocus
          onFocus={autoSelect}
          onKeyPress={handleKeyPress}
        />
        <CheckIcon onClick={toggleEditing} />
        <DeleteIcon onClick={deleteItem} />
      </li>
    )
  }
  return editing ? renderEdit() : renderName()
}
