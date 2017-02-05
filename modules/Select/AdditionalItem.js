import React from 'react'

export const AdditionalItem = React.createClass({
  getInitialState () {
    const editing = this.props.item === 'new item'
    return {editing: editing}
  },
  toggleEditing () {
    if (this.state.editing) {
      this.props.updateItem(this.props.index, this.state.name)
    }
    this.setState({editing: !this.state.editing})
  },
  updateItemName (ev) {
    this.setState({name: ev.target.value})
  },
  renderName () {
    return <div>
      <span onDoubleClick={this.toggleEditing}>{this.props.item}</span>
    </div>
  },
  renderEdit () {
    return (
      <div>
        <input
          type="text"
          value={this.state.name || this.props.item}
          autoFocus
          onFocus={ev => ev.target.select()}
          onChange={this.updateItemName}
          onBlur={this.toggleEditing}
          onKeyPress={this.logEvent}
        />
        <span className="curvedBorder"><span className="pt-icon-standard pt-icon-tick" /></span>
      </div>
    )
  },
  logEvent (ev) {
    ev.charCode === 13 ? this.toggleEditing() : null
  },
  render () {
    return this.state.editing ? this.renderEdit() : this.renderName()
  }
})