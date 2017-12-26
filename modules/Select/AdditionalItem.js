import React, {Component} from 'react'

export default class AdditionalItem extends Component {
  state = {
    editing: this.props.item.id === 'new item'
  }
  toggleEditing = () => {
    if (this.state.editing) {
      this.props.updateItem(this.props.index, this.state.name)
    }
    this.setState({name: this.props.item.id, editing: !this.state.editing})
  }
  updateItemName = (ev) => {
    this.setState({name: ev.target.value})
  }
  renderName = () => {
    return <div>
      <span onDoubleClick={this.toggleEditing}>{this.props.item.id}</span>
    </div>
  }
  deleteItem = () => {
    this.props.deleteItem(this.props.index)
    this.setState({editing: false})
  }
  renderEdit = () => {
    return (
      <div>
        <input
          type="text"
          value={this.state.name || this.props.item.id}
          autoFocus
          onFocus={ev => ev.target.select()}
          onChange={this.updateItemName}
          onKeyPress={this.logEvent}
        />
        <span onClick={this.toggleEditing} className="curvedBorder"><span className="pt-icon-standard pt-icon-tick" /></span>
        <span onClick={this.deleteItem} className="curvedBorder"><span className="pt-icon-standard pt-icon-delete" /></span>
      </div>
    )
  }
  logEvent = (ev) => {
    ev.charCode === 13 ? this.toggleEditing() : null
  }
  render () {
    return this.state.editing ? this.renderEdit() : this.renderName()
  }
}