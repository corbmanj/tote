import React from 'react'

export default React.createClass({
  updateOutfitItem (e) {
    this.props.updateOutfitItem(this.props.index, e.target.value)
  },

  render () {
    const options = this.props.items.map((item, index) => {
      return <option key={index} value={item.type}>{item.type}</option>
    })
    return <select onChange={this.updateOutfitItem}><option value="0">select one...</option>{options}</select>
  }
})