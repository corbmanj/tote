import React from 'react'
import SetupOutfit from './SetupOutfit'

export default React.createClass({
  render () {
    const types = this.props.types.map((type, index) => {
      return (
        <SetupOutfit
          key={index}
          index={index}
          outfit={type}
          addItem={this.props.addItem}
          items={this.props.items}
          updateOutfitItem={this.props.updateOutfitItem}
        />
      )
    })
    return (
      <div className="flex-2">
        <span>Add some outfit types / activities that will be used to build your trip</span>
        <h2>Outfit Section</h2>
        <div><button className="button" onClick={this.props.addOutfit}>Add New Outfit Type</button></div>
        <ul className="sectionList">
        {types}
        </ul>
      </div>
    )
  }
})