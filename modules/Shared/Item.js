import React, { useState, useRef } from 'react'

export default function Item (props) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(props.item.name)
  const nameInput = useRef(null)

  function toggleEditing () {
    if (editing) {
      if (!(name.trim() === '')) {
        props.updateNamedItemInAllOutfits(props.item.id, name)
      }
    }
    console.log(nameInput.current)
    setName(nameInput.current.value)
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
          placeholder="item name ..."
          autoFocus
          onFocus={autoSelect}
          // onChange={updateItemName}
          onKeyPress={handleKeyPress}
        />
        <span onClick={toggleEditing} className="curvedBorder"><span className="pt-icon-standard pt-icon-tick" /></span>
        <span onClick={deleteItem} className="curvedBorder"><span className="pt-icon-standard pt-icon-delete" /></span>
      </li>
    )
  }
  return editing ? renderEdit() : renderName()
}