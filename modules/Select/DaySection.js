import React, {Component} from 'react'
import moment from 'moment'
import OutfitSection from './OutfitSection'
import './../../public/skycons'
import { Collapse } from "@blueprintjs/core"
import _ from 'lodash'

export default class DaySection extends Component {
  state = {
    outfits: this.props.day.outfits,
    isOpen: this.props.index === 0
  }
  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
  componentDidMount () {
    let icons = new Skycons({"resizeClear": true})
    icons.add(this.props.image, this.props.day.icon)
    icons.play()
  }
  updateDay = (key, outfit, inc) => {
    let tempState = this.state.outfits
    const outfitCopy = _.cloneDeep(outfit)
    if (inc === 1) {
      tempState[key]['items'] = outfitCopy.items
      tempState[key]['name'] = outfitCopy.name
      tempState[key]['type'] = outfitCopy.type
    } else if (inc === -1) {
      tempState[key]['items'] = []
      tempState[key]['name'] = outfitCopy.name
      tempState[key]['type'] = outfitCopy.type
    } else if (inc === 0) {
      tempState.splice(key, 1)
    }
    this.setState({outfits: tempState})
    this.props.updateTote(this.props.index, key, outfitCopy, inc)
  }
  updateName = (key, name) => {
    let tempState = this.state.outfits
    tempState[key]['realName'] = name
    this.setState({outfits: tempState})
    this.props.updateOutfitName(this.props.index, key, name)
  }
  addOutfit = () => {
    const num = this.state.outfits.length + 1 || 1
    const newOutfit = {
      id: num,
      realName: "Outfit " + num
    }
    let tempOutfits = this.state.outfits
    tempOutfits.push(newOutfit)
    this.setState({ outfits: tempOutfits, activeOutfit: newOutfit.id })
  }
  updateActiveOutfit = (index) => {
    this.setState({activeOutfit: index})
  }
  render() {
    const outfits = this.state.outfits.map((outfit, index) => {
      return (
        <OutfitSection
          key={index}
          index={index}
          outfit={outfit}
          outfitTypes={this.props.outfitTypes}
          updateDay={this.updateDay}
          updateName={this.updateName}
          activeOutfit={this.state.activeOutfit || 1}
          updateActiveOutfit={this.updateActiveOutfit}
          renderCopyModal={this.props.renderCopyModal}
        />
      )
    })
    const carotClass = this.state.isOpen ? "pt-icon-standard pt-icon-chevron-down" : "pt-icon-standard pt-icon-chevron-right"
    return (
      <li>
        <h4 onClick={this.toggleOpen}>
          <span className={carotClass} />
          {moment(this.props.day.date).format('ddd, MMM Do YYYY')}
          <canvas id={this.props.image} width="42" height="42"></canvas>
        </h4>
        <Collapse isOpen={this.state.isOpen}>
          <p>{this.props.day.summary}</p>
          <p>High: {this.props.day.high} &deg;F Low: {this.props.day.low}&deg; F</p>
          <ul className="sectionList">
            {outfits}
          </ul>
          <button onClick={this.addOutfit}>Add Outfit</button>
          <hr />
        </Collapse>
      </li>
    )
  }
}