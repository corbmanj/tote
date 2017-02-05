import React from 'react'

export default React.createClass({
  render () {
    return (
      <div>
        <button value='schedule' onClick={this.props.updateStage}>Plan a New Trip</button>
        <button value='load' onClick={this.updateStage}>Load a Saved Trip</button>
      </div>
    )
  }
})
