import React from 'react'

export default React.createClass({
  render () {
    const items = this.props.items ? this.props.items.map((item, index) => {
      return (
        <div key={index}>
          <span>{item}</span>
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