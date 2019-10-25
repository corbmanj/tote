import React, { useState, useRef, useContext } from 'react'
import { AppContext } from '../AppState'

export default function AssignItem (props) {
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState(false)
  const itemName = useRef(null)
  const context = useContext(AppContext)

  function renderSelect () {
    const namedItems = context.tote.namedItems || []
    const options = namedItems.filter((filteredItem) => {
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
      const newId = context.tote.namedItems && context.tote.namedItems.length ? Math.max(...context.tote.namedItems.map(item => item.id)) + 1 : 1
      context.addNamedItem(props.item.parentType, value, newId)
      context.updateOutfitItem(props.dayIndex, props.outfitIndex, props.item.parentType, newId)
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
        context.updateOutfitItem(props.dayIndex, props.outfitIndex, props.item.parentType, e.target.value)
    }
  }
  return (
    <li> {props.item.type}: &nbsp;
      {editing ? renderInput() : renderSelect()}
    </li>
  )  
}