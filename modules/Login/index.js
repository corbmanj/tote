import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import SvgIcon from '@material-ui/core/SvgIcon'
import InputAdornment from '@material-ui/core/InputAdornment'
import { AppContext } from '../AppState'
import './login.scss'
import { Button } from '@material-ui/core'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default function Login() {
  const context = useContext(AppContext)
  const history = useHistory()
  const [state, setState] = useState({
    loggedIn: false,
    email: 'hannah.robus@gmail.com',
    password: 'Password1'
  })

  async function submitLogin(e) {
    e.preventDefault()
    setState({ ...state, loginError: false })
    try {
      const response = await axios.get(`${baseUrl}/db/user/${state.email}`)
      if (!response.data || response.data === {}) {
        setState({ ...state, loginError: true })
      } else {
        bcrypt.compare(state.password, response.data.password, async (_err, res) => {
          if (res) {
            setState({ ...state, first: response.data.first, last: response.data.last, userId: response.data.id, loggedIn: true, loginError: false })
            // fetch users list of outfits
            const outfitResponse = await axios.get(`${baseUrl}/db/userItems/${response.data.id}`)
            if (!outfitResponse.data.outfits.length) { // user has not yet set up outfits
              context.setUser(response.data.id)
              history.push('/home')
            }
            else {
              const tote = { ...context.tote }
              tote.additionalItems = outfitResponse.data.additionalItems
              context.setTote(tote)
              context.setOutfitTypes(outfitResponse.data.outfits)
              context.setUser(response.data.id)
              history.push('/home')
            }
          } else {
            setState({ ...state, loginError: true })
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  function renderError() {
    return <span className="error">Error: Invalid email or password</span>
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            name="email"
            className="login-input"
            fullWidth
            placeholder="email"
            variant="outlined"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon>
                    <path d="M11.5556 5.03125C11.5556 7.80993 9.29211 10.0625 6.5 10.0625C3.70789 10.0625 1.44444 7.80993 1.44444 5.03125C1.44444 2.25257 3.70789 0 6.5 0C9.29211 0 11.5556 2.25257 11.5556 5.03125Z" fill="#878787" />
                    <path d="M0 10.0625H13V23H0V10.0625Z" fill="#878787" />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="password"
            className="login-input"
            fullWidth
            placeholder="password"
            variant="outlined"
            type="pasword"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon>
                    <path d="M9 4.5C9 4.66901 8.99068 4.83585 8.97253 5H9V6H7V5C7 4.60605 6.93534 4.21591 6.8097 3.85196C6.68406 3.48798 6.49991 3.15726 6.26777 2.87869C6.03562 2.6001 5.76002 2.37912 5.45671 2.22836C5.15339 2.07761 4.8283 2 4.5 2C4.1717 2 3.8466 2.07761 3.54329 2.22836C3.23998 2.37912 2.96438 2.6001 2.73223 2.87869C2.50009 3.15726 2.31594 3.48798 2.1903 3.85196C2.06466 4.21591 2 4.60605 2 5V8H9V16H0V5H0.0274658C0.00931931 4.83585 0 4.66901 0 4.5C0 2.01471 2.01472 0 4.5 0C6.98528 0 9 2.01471 9 4.5Z" fill="#757575" />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button disabled={!state.email || !state.password} onClick={submitLogin}>
            Continue
          </Button>
        </Grid>
      </Grid>
      {/* <div className="inputRow">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.5C8 5.433 6.433 7 4.5 7C2.567 7 1 5.433 1 3.5C1 1.567 2.567 0 4.5 0C6.433 0 8 1.567 8 3.5Z" fill="#757575"/>
            <path d="M0 7H9V16H0V7Z" fill="#757575"/>
          </svg>
          <input type="email" name="email" placeholder="email address" onChange={handleChange} />
        </div>
        <div className="inputRow">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 4.5C9 4.66901 8.99068 4.83585 8.97253 5H9V6H7V5C7 4.60605 6.93534 4.21591 6.8097 3.85196C6.68406 3.48798 6.49991 3.15726 6.26777 2.87869C6.03562 2.6001 5.76002 2.37912 5.45671 2.22836C5.15339 2.07761 4.8283 2 4.5 2C4.1717 2 3.8466 2.07761 3.54329 2.22836C3.23998 2.37912 2.96438 2.6001 2.73223 2.87869C2.50009 3.15726 2.31594 3.48798 2.1903 3.85196C2.06466 4.21591 2 4.60605 2 5V8H9V16H0V5H0.0274658C0.00931931 4.83585 0 4.66901 0 4.5C0 2.01471 2.01472 0 4.5 0C6.98528 0 9 2.01471 9 4.5Z" fill="#757575"/>
          </svg>
          <input type="password" name="password" placeholder="password" onChange={handleChange} />
        </div>
        <div className="inputRow">
          <BusinessCenterIcon /> {/*color="#757575"*/}
      {/* <input type="submit" value="continue" disabled={!state.email || !state.password} />
        </div> */}
      {state.loginError && renderError()}
    </>
  )
}

// Login.contextType = AppContext;