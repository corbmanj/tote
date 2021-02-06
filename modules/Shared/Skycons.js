import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Skycons from './../../public/skycons'

export default class ReactSkycons extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    autoplay: PropTypes.bool,
    icon: PropTypes.oneOf([
      'CLEAR-DAY',
      'CLEAR-NIGHT',
      'PARTLY-CLOUDY-DAY',
      'PARTLY-CLOUDY-NIGHT',
      'CLOUDY',
      'RAIN',
      'SLEET',
      'SNOW',
      'WIND',
      'FOG'
    ])
  };

  static defaultProps = {
    color: null,
    autoplay: true
  };

  constructor (props) {
    super(props)

    this.state = {
      skycons: new Skycons({ 'color': this.props.color })
    }
  }

  componentDidMount () {
    const { skycons } = this.state
    skycons.add(ReactDOM.findDOMNode(this), Skycons[this.props.icon.split('-').join('_')])

    if (this.props.autoplay) {
      skycons.play()
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   this.state.skycons.set(ReactDOM.findDOMNode(this), Skycons[nextProps.icon])
  // }

  componentWillUnmount () {
    const { skycons } = this.state
    skycons.pause()
    skycons.remove(ReactDOM.findDOMNode(this))
  }

  play () {
    this.state.skycons.play()
  }

  pause () {
    this.state.skycons.pause()
  }

  render () {
    const {
      /* eslint-disable */
      // to remove unnecessary props
      color,
      autoplay,
      icon,
      /* eslint-enable */
      ...restPops
    } = this.props

    const defaultStyle = {
      width: '6em',
      height: '3em'
    }

    return (
      <canvas style={defaultStyle} {...restPops} />
    )
  }
}