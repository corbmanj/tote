import React from 'react'
require('isomorphic-fetch')

export default React.createClass({
  getInitialState () {
    return {
      loggedIn: false,
      email: 'corbmanj@gmail.com',
      password: 'Password1'
    }
  },

  submitLogin (e) {
    let that = this
    e.preventDefault()
    this.setState({loginError: false})
    fetch(`//localhost:8080/db/user/${this.state.email}/${this.state.password}`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json();
      })
      .then(function (response) {
        if (!response.length) {
          console.log('no length')
          that.setState({loginError: true})
        }
        else {
          that.setState({first: response[0].first, last: response[0].last, userId: response[0].id, loggedIn: true, loginError: false})
          // fetch users list of outfits
          fetch(`//localhost:8080/db/userItems/${that.state.userId}`)
            .then(function (response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server")
              }
              return response.json();
            })
            .then(function (response) {
              if (!response.outfits.length) { // user has not yet set up outfits
                console.log('no outfit length')
                that.props.updateState({userId: that.state.userId, currentStage: 'setup'})
              }
              else {
                console.log('outfits=', response)
                const tote = that.props.tote
                tote.additionalItems = response.additionalItems
                that.props.updateState(tote)
                that.props.updateState({outfitTypes: response.outfits, userId: that.state.userId})
              }
            })
        }
      })
  },

  renderGetStarted () {
    return (
      <div>
        <button>Plan A New Trip</button>
        <h2>Load A Saved Trip</h2>
      </div>
    )
  },

  renderError () {
    return <span className="error">Error: Invalid email or password</span>
  },

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
})