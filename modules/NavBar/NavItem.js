import React from 'react'

export default React.createClass({
  render () {
    return (
      <label>
        <input
          className={this.props.classNames}
          type="button"
          value={this.props.stage}
          onClick={this.props.updateState}
          disabled={this.props.disabled}
        />
        { !this.props.isLast ? <span className="pt-icon-standard pt-icon-chevron-right" /> : null }
      </label>
    )
  }
})