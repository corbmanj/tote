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
          <InputGroup leftIcon="person" />
          <input type="email" name="email" placeholder="email address" onChange={this.handleChange} />
          <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
          <input type="submit" value="continue" disabled={!this.state.email || !this.state.password} />
        </form>
        {this.state.loginError ? this.renderError() : null}
      </>
    )
  }
}

Login.contextType = AppContext;