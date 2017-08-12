import React from 'react'

export default function Modal (props) {
  return (
    <label>
      <input
        className={props.classNames}
        type="button"
        value={props.stage}
        onClick={props.updateState}
        disabled={props.disabled}
      />
      { !props.isLast ? <span className="pt-icon-standard pt-icon-chevron-right" /> : null }
    </label>
  )
}