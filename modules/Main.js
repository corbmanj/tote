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

require('es6-promise').polyfill()
require('isomorphic-fetch')
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css'

// const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class Main extends Component {
  handlePackingCheckboxChange = (section, id, type) => {
    const tote = {...this.context.tote}
    if (section === 'named') {
      const itemIndex = tote.namedItems.findIndex(item => item.id === id)
      tote.namedItems[itemIndex].packed = !tote.namedItems[itemIndex].packed
    } else if (section === 'unnamed') {
      const toggleItemIndex = tote.unnamed.findIndex(item => item.id === id)
      tote.unnamed[toggleItemIndex].packed = !tote.unnamed[toggleItemIndex].packed
    } else if (section === 'additional') {
      let typeIndex = tote.additionalItems.findIndex(thisType => thisType.name === type)
      let toggleItemIndex = tote.additionalItems[typeIndex].items.findIndex(item => item.id === id)
      tote.additionalItems[typeIndex].items[toggleItemIndex].packed = !tote.additionalItems[typeIndex].items[toggleItemIndex].packed
    }
    this.context.setTote(tote)
  }

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
        return <PackingList handleCheckboxChange={this.handlePackingCheckboxChange} />
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
