import React, { useState, useRef } from 'react'
// import { Collapse } from '@blueprintjs/core'

export default function AssignItem (props) {
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState(false)
  const itemName = useRef(null)
  // const [itemName, setItemName] = useState()

  function renderSelect () {
    const options = props.namedItems.filter((filteredItem) => {
      return filteredItem.parentType === props.item.parentType
    }).map((item) => {
      return <option key={item.id} value={item.id}>{item.name}</option>
    })
    const selectValue = props.item.id || 'select'
    return (
      <select onChange={handleSelectChange} value={selectValue}>
        <option value="select">Select one...</option>
        {options}
        <option value="add">add new...</option>
      </select>
    )
  }

  function handleFocus (e) {
    e.target.select()
  }

  function handleKeyPress (e) {
    if (e.charCode === 13) {
      saveOption()
    }
  }

  function renderInput () {
    return (
      <span>
        <input
          ref={itemName}
          placeholder="add new ..."
          type="text"
          autoFocus
          onFocus={handleFocus}
          onBlur={saveOption}
          onKeyPress={handleKeyPress}
        />
        {error ? <span className="error">{error}</span> : null}
        <button onClick={saveOption}>Save</button>
      </span>
    )
  }
  
  function saveOption () {
    const { value } = itemName.current
    if (value.trim() === '') {
      setError('Item name cannot be blank')
    } else {
      let stateArray = props.namedItems
      stateArray.sort((a,b) => b.id - a.id)
      const newId = stateArray.length > 0 ? stateArray[0].id + 1 : 1
      let newItem = {parentType: props.item.parentType, name: value, id: newId}
      stateArray.push(newItem)
      props.updateNamedItems(stateArray)
      props.updateOutfit(newId)
      setEditing(false)
    }
  }
  function handleSelectChange (e) {
    switch (e.target.value) {
      case 'select':
        break
      case 'add':
        setEditing(true)
        break
      default:
        props.updateOutfit(e.target.value)
    }
  }
  return (
    <li> {props.item.type}: &nbsp;
      {editing ? renderInput() : renderSelect()}
    </li>
  )  
}