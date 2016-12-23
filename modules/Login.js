import React from 'react'
require('isomorphic-fetch')

export default React.createClass({
  getInitialState () {
    return {loggedIn: false}
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
          console.log(response)
          that.setState({first: response[0].first, last: response[0].last, userId: response[0].id, loggedIn: true, loginError: false})
          // fetch users list of outfits
          fetch(`//localhost:8080/db/outfits/${that.state.userId}`)
            .then(function (response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server")
              }
              return response.json();
            })
            .then(function (response) {
              if (!response.length) {
                that.setState({newUser: true})
              }
              else {
                console.log(response)
                that.setState({outfitTypes: response})
                that.props.updateState({userId: that.state.userId, outfitTypes: that.state.outfitTypes})
              }
            })
            // if user has no list of outfits, send them through the setup process
            // otherwise show the get started page
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