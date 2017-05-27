import React from 'react'

export default React.createClass({
  render() {
    const items = this.props.outfit.items.map((item, key) => {
      if (item.id) {
        const itemName = this.props.namedItems.find(namedItem => namedItem.id === item.id).name
        console.log(itemName)
        console.log(key)
        return <span key={key}><b>{item.parentType}:</b> {itemName}</span>
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