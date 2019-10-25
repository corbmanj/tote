import React, {Component} from 'react'
import { AppContext } from './AppState'
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export default class GetStarted extends Component {
  async componentDidMount () {
    const response = await axios.get(`${baseUrl}/db/userItems/${this.context.userId}`)
    if (!response.data.outfits.length) { // user has not yet set up outfits
      this.context.setStage('setup')
    } else {
      this.context.setOutfitTypes(response.data.outfits)
      this.context.setAdditionalItems(response.data.additionalItems)
    }
  }

  initializeTrip = async (ev) => {
    const newStage = ev.target.value
    try {
      const response = await axios.post(`${baseUrl}/db/tote/newTrip/${this.context.userId}`)
      this.context.clearTote()
      this.context.setTripId(response.data.id)
      this.context.setStage(newStage)
    } catch (err) {
      console.error(err)
    }
  }

  updateStage = (ev) => {
    this.context.setStage(ev.target.value)
  }

  render () {
    return (
      <div>
        <button value='schedule' onClick={this.initializeTrip}>Plan a New Trip</button>
        <button value='load' onClick={this.updateStage}>Load a Saved Trip</button>
        <button value='setup' onClick={this.updateStage}>Edit User Settings</button>
      </div>
    )
  }
}

GetStarted.contextType = AppContext;