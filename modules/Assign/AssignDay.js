import React, {Component} from 'react'
import moment from 'moment'
import AssignOutfit from './AssignOutfit'
import '../../public/skycons'
import { Collapse } from "@blueprintjs/core"

export default class AssignDay extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {activeOutfit: 1, isOpen: this.props.index === 0}
  // }
  // getInitialState() {
  //   return {activeOutfit: 1, isOpen: this.props.index === 0}
  // },

  state = {activeOutfit: 1, isOpen: this.props.index === 0}

  updateOutfit = (id, outfitIndex) => {
    this.props.updateOutfit(id, outfitIndex, this.props.index)
  }

  updateActiveOutfit = (index) => {
    this.setState({activeOutfit: index})
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const outfits = this.props.day.outfits.map((outfit, index) => {
      return (
        <AssignOutfit
          key={index}
          index={index}
          active={this.state.activeOutfit === outfit.id}
          outfit={outfit}
          namedItems={this.props.namedItems}
          updateNamedItems={this.props.updateNamedItems}
          updateNamedItemInAllOutfits={this.props.updateNamedItemInAllOutfits}
          updateOutfit={this.updateOutfit}
          updateActiveOutfit={this.updateActiveOutfit}
        />
      )
    })
    const carotClass = this.state.isOpen ? "pt-icon-standard pt-icon-chevron-down" : "pt-icon-standard pt-icon-chevron-right"
    return (
      <li>
        <h3 onClick={this.toggleOpen}>
          <span className={carotClass} />
          {moment(this.props.day.date).format('ddd, MMM Do YYYY')}
        </h3>
        <Collapse isOpen={this.state.isOpen}>
          <p>{this.props.day.summary}</p>
          <p>High: {this.props.day.high} &deg;F Low: {this.props.day.low}&deg; F</p>
          <ul className="sectionList">
            {outfits}
          </ul>
        </Collapse>
      </li>
    )
  }
}