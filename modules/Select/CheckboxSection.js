import { Grid } from '@material-ui/core'
import React from 'react'
export default function CheckboxSection(props) {
  function toggleItem(ev) {
    props.toggle(ev.target.value, ev.target.checked)
  }
  const outfitItems = props.outfit.items || []
  const checkboxes = outfitItems.map((item, key) => {
    return (
      <Grid item key={key}>
        <label className="checkbox-input">
          <input
            type="checkbox"
            value={item.type}
            defaultChecked={!item.isNotIncluded}
            onClick={toggleItem}
            disabled={props.disabled}
          />
          {item.type}
        </label>
      </Grid>
    )
  })
  return (
    <div className="checkboxes">
      <Grid container>
        {checkboxes}
      </Grid>
    </div>
  )
}