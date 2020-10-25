import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../AppState'

export default function NavItem (props) {
  const context = useContext(AppContext)
  const history = useHistory()
  const { stage, svg, classNames, disabled } = props
  function updateStage (ev) {
    context.setStage(ev.target.value.toLowerCase())
    history.push(`/${ev.target.value.toLowerCase()}`)
  }

  return (
    <label key={stage} className="navItem">
        <div className="navNumber">{svg}</div>
        <input
          className={classNames}
          type="button"
          value={stage}
          onClick={updateStage}
          disabled={disabled}
        />
    </label>
  )
}