import React, { useState } from 'react'

export default function SetupAdditionalItem (props) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(props.item.name)

  function toggleEditing () {
    setEditing(!editing)
  }

  function updateName (ev) {
    // todo: use ref
    setName(ev.target.value)
  }

  function saveItem () {
    toggleEditing()
    props.saveEditedItem(name, this.props.item.id)
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
          value={name}
          type="text"
          onChange={updateName}
          autoFocus
          onFocus={autoSelect}
          onBlur={saveItem}
          onKeyPress={handleKeyPress}
        />
        <button onClick={this.saveItem}>Save</button>
      </>
    )
  }

  function renderName () {
    return <li onDoubleClick={toggleEditing}>{name}</li>
  }

  return (
    <div>
      {editing ? renderInput() : renderName()}
    </div>
  )
}