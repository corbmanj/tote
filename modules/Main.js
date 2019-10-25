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
import { AppContext } from './AppState'
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css'

export default class Main extends Component {

  renderToast = () => {
    return (
      <Toast
        message={this.context.toastProps.message || "no message"}
        type={this.context.toastProps.type || "success"}
      />
    )
  }

  conditionallyRenderNavMenu () {
    if (this.context.stage !== 'setup') {
      return <NavMenu active={this.context.stage} />
    }
  }
  renderStage = (stage) => {
    switch (stage) {
      case 'load':
        return <LoadTrips />
      case 'setup':
        return <Setup />
      case 'schedule':
        return <Schedule />
      case 'select':
        return <SelectOutfits />
      case 'assign':
        return <AssignItems />
      case 'packing':
        return <PackingList />
      case 'print':
        return <OutfitsList />
      default:
        return (
          <div>
            <h1>Welcome to Tote</h1>
            {this.context.userId ? <GetStarted /> : <Login />}
          </div>
        )
    }
  }

  render() {
    return (
      <div>
        {this.conditionallyRenderNavMenu()}
        {this.renderStage(this.context.stage)}
        <ReactCSSTransitionGroup
          transitionName="toast"
          transitionEnter
          transitionEnterTimeout={300}
          transitionAppear={false}
          transitionLeave
          transitionLeaveTimeout={300}
        >
          {this.context.showToast && this.renderToast()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

Main.contextType = AppContext;
