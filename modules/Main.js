import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './Login'
import Schedule from './Schedule/Schedule'
import SelectOutfits from './Select/SelectOutfits'
import AssignItems from './Assign/AssignItems'
import PackingList from './Packing/PackingList'
import NavMenu from './NavBar/NavMenu'
import Footer from './Footer'
import GetStarted from './GetStarted'
import Setup from './Setup/SetupMain'
import LoadTrips from './LoadTrips'
import Toast from './Shared/Toast'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { AppContext } from './AppState'
import './main.scss'

function Main(props) {
  const { location } = props
  const context = useContext(AppContext)

  function renderToast () {
    return (
      <Toast
        message={context.toastProps.message || "no message"}
        type={context.toastProps.type || "success"}
      />
    )
  }

  function conditionallyRenderNavMenu() {
    if (context.userId && location.pathname !== '/setup') {
      return <NavMenu />
    }
  }

  function conditionallyRenderFooter() {
    if (context.userId) {
      return <Footer isSetup={location.pathname === '/setup'} />
    }
  }

  function renderStage () {
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

  return (
    <div className="main">
      {conditionallyRenderNavMenu()}
      <div className="stage">
        {renderStage()}
      </div>
      <CSSTransitionGroup
        transitionName="toast"
        transitionEnter
        transitionEnterTimeout={300}
        transitionAppear={false}
        transitionLeave
        transitionLeaveTimeout={300}
      >
        {context.showToast && renderToast()}
      </CSSTransitionGroup>
      <div className="footer">
        {conditionallyRenderFooter()}
      </div>
    </div>
  )
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
}

export default withRouter(Main)
