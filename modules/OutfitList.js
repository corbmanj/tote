import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>  
        <div>Printable Tote</div>
        <div>You're done!</div>
        <button><NavLink to='/'>Home</NavLink></button>
      </div>
      )
  }
})