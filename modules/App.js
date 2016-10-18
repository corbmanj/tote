import React from 'react'
import Schedule from './Schedule'
import SelectOutfits from './SelectOutfits'
import AssignItems from './AssignItems'
import PackingList from './PackingList'
import OutfitList from './OutfitList'

export default React.createClass({
  getInitialState: function () {
    return {
      numDays: 0,
      currentStage: 'home',
      tote: {}
    }
  },
  updateStage: function (newStage) {
    this.setState({ currentStage: newStage.target.value })
  },
  updateState: function (stateObj) {
    this.setState(stateObj)
  },
  renderStage: function(stage) {
    switch (stage) {
      case 'schedule':
        return <Schedule updateState={this.updateState} />
        break
      case 'select':
        return <SelectOutfits updateState={this.updateState} days={this.state.days} tote={this.state.tote}/>
        break
      case 'assign':
        return <AssignItems updateState={this.updateState} days={this.state.days} tote={this.state.tote}/>
        break
      case 'packing':
        return <PackingList updateState={this.updateState} tote={this.state.tote} />
        break
      case 'print':
        return <OutfitList updateState={this.updateState} days={this.state.days} />
        break
      default:
        return (
          <div>
            <h1>Welcome to Tote</h1>
              <button value='schedule' onClick={this.updateStage}>Get Started</button>
          </div>
        )
    }
  },
  render() {
    return this.renderStage(this.state.currentStage)
  }
})
