import React from 'react'

export default React.createClass({
  render () {
    const items = this.props.items.map((item, index) => {
      return <span key={index}>{item.name}, </span>
    })
    return (
      <div>
        <input type="checkbox" />{this.props.parentType}: {items}
      </div>
    )
  }
})