import React from 'react'

export default React.createClass({
  render() {
    const items = this.props.outfit.items.map((item, key) => {
      if (item.name) {
        return <span key={key}>{item.parentType}: {item.name},</span>
      } else { return null }
    })
    return (
      <div>
        <h3>{this.props.outfit.realName} ({this.props.outfit.type})</h3>
        {items}
      </div>
    )
  }
})