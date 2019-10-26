import React, {Component} from 'react'
import axios from 'axios'
import { AppContext } from './AppState';
import bcrypt from 'bcryptjs'

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

  render () {
    return (
      <div>
        <form onSubmit={this.submitLogin}>
          <input type="email" placeholder="enter email" onChange={(e) => { this.setState({email: e.target.value}) }} />
          <input type="password" placeholder="enter password" onChange={(e) => { this.setState({password: e.target.value}) }} />
          <input type="submit" />
        </form>
        {this.state.loginError ? this.renderError() : null}
      </div>
    )
  }
}

Login.contextType = AppContext;