import React from 'react'
import UnnamedItems from './UnnamedItems'
import NamedItems from './NamedItems'
import AdditionalItemSectionPacking from './AdditionalItemSectionPacking'

export default React.createClass({
  updateStage () {
    let stateObj = {}
    stateObj.currentStage = 'print'
    this.props.updateState(stateObj)
  },
  render() {
    const additionalItemTypes = this.props.tote.additionalItems.map((type, index) => {
      return (
        <AdditionalItemSectionPacking
          key={index}
          type={type.name}
          items={type.items}
        />
      )
    })
    return (
      <div>
        <h3>Packing List</h3>
        <UnnamedItems items={this.props.tote.unnamed} />
        <NamedItems items={this.props.tote.namedItems} />
        {additionalItemTypes}
        <button onClick={this.updateStage}>Print Your Tote</button>
      </div>
    )
  }
})