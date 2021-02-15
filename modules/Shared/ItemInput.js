import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Done } from '@material-ui/icons';
import { Divider, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function ItemInput({ onSave }) {
  const classes = useStyles()
  const newItemRef = useRef()

  function handleSave() {
    onSave(newItemRef.current.value)
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase placeholder="add item..." className={classes.input} inputRef={newItemRef} />
      <Divider orientation="vertical" className={classes.divider} />
      <IconButton color="primary" aria-label="done" onClick={handleSave} className={classes.iconButton}>
        <Done />
      </IconButton>
    </Paper>
  )
}

ItemInput.propTypes = {
  onSave: PropTypes.func,
}