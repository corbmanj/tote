import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export default function NavItem (props) {
  const history = useHistory()
  const { stage, svg, classNames, disabled } = props
  function updateStage (ev) {
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

NavItem.propTypes = {
  stage: PropTypes.string,
  svg: PropTypes.string,
  classNames: PropTypes.string,
  disabled: PropTypes.bool,
}