import React from 'react'

export default function SetupOutfitItem (props) {
  const updateOutfitItem = (e) => {
    props.updateOutfitItem(props.index, e.target.value)
  }
  const options = props.items.map((item, index) => {
    return <option key={index} value={item.type}>{item.type}</option>
  })

  return (
    <div>
      <select value={props.value} onChange={updateOutfitItem}>
        <option value="0">select one...</option>
        {options}
      </select>
      <span className="pt-icon-standard pt-icon-delete" onClick={() => props.removeOutfitItem(props.index)} />
    </div>
  )
}