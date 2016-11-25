import React from 'react'

export const AdditionalItemSection = React.createClass({
  resetType: function (ev) {
    this.props.resetType(ev.target.value, 'type', '')
  },
  renderResetButton: function (item) {
    return (
      <button value={item.id} onClick={this.resetType}>&lt;-</button>
    )
  },
  render() {
    const items = this.props.items ? this.props.items.map((item, index) => {
      return (
        <div key={index}>
          <span>{item.name}</span>
          { this.props.resetType ? this.renderResetButton(item) : null }
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