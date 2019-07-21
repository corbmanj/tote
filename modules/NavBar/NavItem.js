import React from 'react'
import { Icon } from '@blueprintjs/core'

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
      { !props.isLast ? <Icon icon="chevron-right" /> : null }
    </label>
  )
}