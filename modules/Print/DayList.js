import React from 'react'
import OutfitList from './OutfitList'

export default React.createClass({
  render() {
    const outfits = this.props.day.outfits.map((outfit, index) => {
      return <OutfitList key={index} index={index} outfit={outfit.outfit}/>
      })
    return (
      <div>
        <h2>{this.props.day.date.format('ddd, MMM Do')}</h2>
        <div>High: {this.props.day.high} Low: {this.props.day.low} Precip%: {this.props.day.precip}</div>
        {outfits}
      </div>
    )
  }
})