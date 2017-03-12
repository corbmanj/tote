import React from 'react'

export default React.createClass({
  render () {
    const items = this.props.items.map((item, index) => {
      return <label key={index}><input type="checkbox" />{item.name}{index === this.props.items.length-1 ? null : ','} </label>
    })
    return (
      <div>
        {this.props.parentType}: {items}
      </div>
    )
  }
})