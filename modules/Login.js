import React, {Component} from 'react'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { InputGroup } from '@blueprintjs/core';
import { AppContext } from './AppState';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      email: 'hannah.robus@gmail.com',
      password: 'Password1'
    }
  }
  submitLogin = async (e) => {
    e.preventDefault()
    this.setState({loginError: false})
    try {
      const response = await axios.get(`${baseUrl}/db/user/${this.state.email}`)
      if (!response.data || response.data === {}) {
        this.setState({loginError: true})
      } else {
        bcrypt.compare(this.state.password, response.data.password, async (_err, res) => {
          if (res) {
            this.setState({first: response.data.first, last: response.data.last, userId: response.data.id, loggedIn: true, loginError: false})
            // fetch users list of outfits
            const outfitResponse = await axios.get(`${baseUrl}/db/userItems/${response.data.id}`)
            if (!outfitResponse.data.outfits.length) { // user has not yet set up outfits
              this.context.setUser(response.data.id)
              this.context.setStage('setup')
            }
            else {
              const tote = {...this.context.tote}
              tote.additionalItems = outfitResponse.data.additionalItems
              this.context.setTote(tote)
              this.context.setOutfitTypes(outfitResponse.data.outfits)
              this.context.setUser(response.data.id)
            }
          } else {
            this.setState({loginError: true})
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  renderError = () => {
    return <span className="error">Error: Invalid email or password</span>
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <>
        <form className="loginForm" onSubmit={this.submitLogin}>  
          <div className="inputRow">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.5C8 5.433 6.433 7 4.5 7C2.567 7 1 5.433 1 3.5C1 1.567 2.567 0 4.5 0C6.433 0 8 1.567 8 3.5Z" fill="#757575"/>
              <path d="M0 7H9V16H0V7Z" fill="#757575"/>
            </svg>
            <input type="email" name="email" placeholder="email address" onChange={this.handleChange} />
          </div>
          <div className="inputRow">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4.5C9 4.66901 8.99068 4.83585 8.97253 5H9V6H7V5C7 4.60605 6.93534 4.21591 6.8097 3.85196C6.68406 3.48798 6.49991 3.15726 6.26777 2.87869C6.03562 2.6001 5.76002 2.37912 5.45671 2.22836C5.15339 2.07761 4.8283 2 4.5 2C4.1717 2 3.8466 2.07761 3.54329 2.22836C3.23998 2.37912 2.96438 2.6001 2.73223 2.87869C2.50009 3.15726 2.31594 3.48798 2.1903 3.85196C2.06466 4.21591 2 4.60605 2 5V8H9V16H0V5H0.0274658C0.00931931 4.83585 0 4.66901 0 4.5C0 2.01471 2.01472 0 4.5 0C6.98528 0 9 2.01471 9 4.5Z" fill="#757575"/>
            </svg>
            <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
          </div>
          <div className="inputRow">
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.93151 1C4.93151 0.447715 5.37922 0 5.93151 0H12.0685C12.6208 0 13.0685 0.447715 13.0685 1V2.94521C13.0685 3.13018 13.0183 3.30343 12.9307 3.45205H16C17.1046 3.45205 18 4.34749 18 5.45205V14.0274C18 15.132 17.1046 16.0274 16 16.0274H2C0.89543 16.0274 0 15.132 0 14.0274V5.45205C0 4.34748 0.895431 3.45205 2 3.45205H5.06929C4.98173 3.30343 4.93151 3.13018 4.93151 2.94521V1ZM7.16438 0.986301C6.6121 0.986301 6.16438 1.43402 6.16438 1.9863V2.45205C6.16438 3.00434 6.6121 3.45205 7.16438 3.45205H10.8356C11.3879 3.45205 11.8356 3.00434 11.8356 2.45205V1.9863C11.8356 1.43402 11.3879 0.986301 10.8356 0.986301H7.16438Z" fill="#757575"/>
            </svg>
            <input type="submit" value="continue" disabled={!this.state.email || !this.state.password} />
          </div>
        </form>
        {this.state.loginError ? this.renderError() : null}
      </>
    )
  }
}

Login.contextType = AppContext;