import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>  
        <div>Packing List</div>
        <button><NavLink to="/print">Print Your Tote</NavLink></button>
      </div>
      )
  }
})