import React from 'react'

export default React.createClass({
  render () {
    const items = this.props.items ? this.props.items.map((item, index) => {
      return (
        <div key={index}>
          <label><input type="checkbox"/>{item}</label>
        </div>
      )
    }) : null
    return (
      <div>
        <h3>{this.props.type}</h3>
        {items}
      </div>)
  }
})