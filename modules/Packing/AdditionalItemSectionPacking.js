import React from 'react'
import PropTypes from 'prop-types'

export default function AdditionalItemSectionPacking(props) {
  const { items, handleCheckboxChange, type } = props
  const itemList = items ? items
    .filter(item => item.selected !== false)
    .map((item, index) => {
      return (
        <div key={index}>
          <label>
            <input defaultChecked={item.packed} type="checkbox" onChange={() => handleCheckboxChange('additional', item.id, props.type)} />
            {item.name}
          </label>
        </div>
      )
    }) : null
  return (
    <div>
      <h3>{type}</h3>
      {itemList}
    </div>
  )
}

AdditionalItemSectionPacking.propTypes = {
  items: PropTypes.array,
  handleCheckboxChange: PropTypes.func,
  type: PropTypes.string
}