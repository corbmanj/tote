import React, {Component} from 'react'
import Login from './Login'
import Schedule from './Schedule/Schedule'
import SelectOutfits from './Select/SelectOutfits'
import AssignItems from './Assign/AssignItems'
import PackingList from './Packing/PackingList'
import OutfitsList from './Print/OutfitsList'
import NavMenu from './NavBar/NavMenu'
import Footer from './Footer'
import GetStarted from './GetStarted'
import Setup from './Setup/SetupMain'
import LoadTrips from './LoadTrips'
import Toast from './Shared/Toast'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
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
    if (!['login', 'setup'].includes(this.context.stage)) {
      return <NavMenu active={this.context.stage} />
    }
  }

  conditionallyRenderFooter () {
    if (!['login', 'setup'].includes(this.context.stage)) {
      return <Footer isSetup={this.context.stage === "setup"} />
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
      case 'home':
        return <GetStarted />
      default:
        return (
          <div>
            <h1 className="welcome">Welcome to Tote!</h1>
              <Login />
          </div>
        )
    }
  }

  render() {
    return (
      <div>
        {this.conditionallyRenderNavMenu()}
        {this.renderStage(this.context.stage)}
        <CSSTransitionGroup
          transitionName="toast"
          transitionEnter
          transitionEnterTimeout={300}
          transitionAppear={false}
          transitionLeave
          transitionLeaveTimeout={300}
        >
          {this.context.showToast && this.renderToast()}
        </CSSTransitionGroup>
        {this.conditionallyRenderFooter()}
      </div>
    )
  }
}

Main.contextType = AppContext;
