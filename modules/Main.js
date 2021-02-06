import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
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
import './main.scss'

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
      return <NavMenu />
    }
  }

  conditionallyRenderFooter () {
    if (!['login', 'setup'].includes(this.context.stage)) {
      return <Footer isSetup={this.context.stage === "setup"} />
    }
  }

  renderStage = () => {
    return (
      <Switch>
        <Route path="/load">
          <LoadTrips />
        </Route>
        <Route path="/setup">
          <Setup />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route path="/select">
          <SelectOutfits />
        </Route>
        <Route path="/assign">
          <AssignItems />
        </Route>
        <Route path="/packing">
          <PackingList />
        </Route>
        <Route path="/home">
          <GetStarted />
        </Route>
        <Route path="/">
          <div>
            <h1 className="welcome">Welcome to Tote!</h1>
              <Login />
          </div>
        </Route>
      </Switch>
    )
  }

  render() {
    return (
      <div className="main">
        {this.conditionallyRenderNavMenu()}
        <div className="stage">
          {this.renderStage()}
        </div>
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
        <div className="footer">
          {this.conditionallyRenderFooter()}
        </div>
      </div>
    )
  }
}

Main.contextType = AppContext;
