import React, {Component} from 'react'
import Login from './Login'
import Schedule from './Schedule/Schedule'
import SelectOutfits from './Select/SelectOutfits'
import AssignItems from './Assign/AssignItems'
import PackingList from './Packing/PackingList'
import OutfitsList from './Print/OutfitsList'
import NavMenu from './NavBar/NavMenu'
import GetStarted from './GetStarted'
import Setup from './Setup/SetupMain'
import LoadTrips from './LoadTrips'
import Toast from './Shared/Toast'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

require('es6-promise').polyfill()
require('isomorphic-fetch')
import '../node_modules/@blueprintjs/core/dist/blueprint.css'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class App extends Component {
  state = {
    numDays: 0,
    currentStage: 'home',
    tote: {},
    showToast: false
  }
  updateStage = (newStage) => {
    this.setState({ currentStage: newStage.target.value })
  }
  saveToDB = () => {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    fetch(`${baseUrl}/db/tote/updateTrip/${this.state.tripId}`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
      });
  }
  updateState = (stateObj) => {
    this.setState(stateObj)
    this.saveToDB()
  }
  updateSateNoSave = (stateObj) => {
    this.setState(stateObj)
  }
  showToast = (toastProps) => {
    this.setState({showToast: true, toastProps})
    setTimeout(() => { this.setState({showToast: false}) }, 1500)
  }
  renderToast = () => {
    return (
      <Toast
        message={this.state.toastProps.message || "no message"}
        type={this.state.toastProps.type || "success"}
      />
    )
  }
  conditionallyRenderNavMenu () {
    if (this.state.currentStage !== 'setup') {
      return (
        <NavMenu
          updateState={this.updateState}
          active={this.state.currentStage}
          tote={this.state.tote}
          home={!this.state.tote}
          schedule={!this.state.tote}
          select={!this.state.days}
          assign={!this.state.tote.unnamed}
          packing={!this.state.tote.namedItems}
          print={!this.state.tote.namedItems}
        />
      )
    }
  }
  renderStage = (stage) => {
    switch (stage) {
      case 'load':
        return <LoadTrips updateState={this.updateSateNoSave} updateStage={this.updateStage} userId={this.state.userId} />
        break
      case 'setup':
        return <Setup updateState={this.updateState} user={this.state.userId} updateStage={this.updateStage}/>
        break
      case 'schedule':
        return <Schedule updateState={this.updateState} startDate={this.state.startDate} endDate={this.state.endDate} city={this.state.city} days={this.state.days} />
        break
      case 'select':
        return <SelectOutfits updateState={this.updateState} days={this.state.days} tote={this.state.tote} outfitTypes={this.state.outfitTypes} showToast={this.showToast}/>
        break
      case 'assign':
        return <AssignItems updateState={this.updateState} days={this.state.days} tote={this.state.tote} />
        break
      case 'packing':
        return <PackingList updateState={this.updateState} tote={this.state.tote} />
        break
      case 'print':
        return <OutfitsList updateState={this.updateState} days={this.state.days} namedItems={this.state.tote.namedItems}/>
        break
      default:
        return (
          <div>
            <h1>Welcome to Tote</h1>
            {this.state.userId ? <GetStarted updateStage={this.updateStage} updateState={this.updateState} userId={this.state.userId}/> : <Login updateState={this.updateSateNoSave} tote={this.state.tote}/>}
          </div>
        )
    }
  }

  render() {
    return (
      <div>
        {this.conditionallyRenderNavMenu()}
        {this.renderStage(this.state.currentStage)}
        <ReactCSSTransitionGroup
          transitionName="toast"
          transitionEnter
          transitionEnterTimeout={300}
          transitionAppear={false}
          transitionLeave
          transitionLeaveTimeout={300}
        >
          {this.state.showToast && this.renderToast()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
