import React from 'react'

export const CheckboxSection = React.createClass({
  toggleItem: function (ev) {
    console.log('clicked', ev.target.value)
    this.props.toggle(ev.target.value, ev.target.checked)
  },
  render() {                                        
    const checkboxes = this.props.outfit.items.map(function (item, key) {
      return (
        <label key={key}>
          <input 
            type="checkbox" 
            value={item.type} 
            defaultChecked={true} 
            onClick={this.toggleItem}
            disabled={this.props.disabled}
          />
          {item.type}
        </label>
      )}, this)
    return <form>{checkboxes}</form>
  }
})