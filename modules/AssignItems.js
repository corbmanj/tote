import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>  
        <div>Assign Items</div>
        <button><NavLink to="/plist">Packing List</NavLink></button>
      </div>
      )
  }
})