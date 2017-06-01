import React from 'react'
import moment from 'moment'

export default React.createClass({
  updateChecked (ev) {
    this.props.updateCopyArray(ev.target.value, ev.target.checked)
  },
  render () {
    const days = this.props.days.map((day, index) => {
      return <li key={index}><label><input type="checkbox" value={index} onChange={this.updateChecked}/>{moment(day.date).format('ddd, MMM Do')}</label></li>
    })
    return <ul className="sectionList">{days}</ul>
  }
})