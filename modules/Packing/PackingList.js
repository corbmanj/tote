import React from 'react'
import UnnamedItems from './UnnamedItems'
import NamedItems from './NamedItems'

export default React.createClass({
  updateStage () {
    let stateObj = {}
    stateObj.currentStage = 'print'
    this.props.updateState(stateObj)
  },
  render() {
    return (
      <div>
        <h3>Packing List</h3>
        <UnnamedItems items={this.props.tote.unnamed} />
        <NamedItems items={this.props.tote.namedItems} />
        <button onClick={this.updateStage}>All Done</button>
      </div>
    )
  }
})