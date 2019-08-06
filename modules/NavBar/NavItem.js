import React, { useContext } from 'react'
import { Icon } from '@blueprintjs/core'
import { AppContext } from '../AppState'

export default function Modal (props) {
  const context = useContext(AppContext)
  function updateStage (ev) {
    context.setStage(ev.target.value)
  }
  return (
    <label>
      <input
        className={props.classNames}
        type="button"
        value={props.stage}
        onClick={updateStage}
        disabled={props.disabled}
      />
      { !props.isLast ? <Icon icon="chevron-right" /> : null }
    </label>
  )
}