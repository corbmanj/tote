import React, { useContext } from 'react'
import { AppContext } from '../AppState'

export default function NavItem (props) {
  const context = useContext(AppContext)
  function updateStage (ev) {
    context.setStage(ev.target.value.toLowerCase())
  }
  return (
    <label className="navItem">
        <div className="navNumber">{props.stageNumber}</div>
        <input
          className={props.classNames}
          type="button"
          value={props.stage}
          onClick={updateStage}
          disabled={props.disabled}
        />
    </label>
  )
}