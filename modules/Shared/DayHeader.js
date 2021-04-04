import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Skycons from '../Shared/Skycons'

export const DayHeader = (props) => {
  const { day, children } = props
  return (
    <div className="day-section">
      <div className="day-details">
        {moment(day.date).format('ddd, MMM Do')}
        <Skycons
          color='black'
          icon={day.icon.toUpperCase()}
          autoplay={true}
        />
        <div>{day.summary}</div>
        <div className="day-temps">
          <div>High:&nbsp;{day.high}&nbsp;&deg;F</div>
          <div>Low:&nbsp;{day.low}&nbsp;&deg;F</div>
        </div>
      </div>
      <div className="outfit-list">
        {children}
      </div>
    </div>
  )
}

DayHeader.propTypes = {
  day: PropTypes.shape({
    outfit: PropTypes.shape({
      type: PropTypes.string,
      realName: PropTypes.string,
      expanded: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.shape({
        dropdown: PropTypes.bool,
        parentType: PropTypes.string,
        type: PropTypes.string,
      })),
    }),
    date: PropTypes.date,
    icon: PropTypes.string,
    summary: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired
}
