import React, {Component} from 'react'

export default class AdditionalItem extends Component {
  state = {
    editing: this.props.item === 'new item',
    name: this.props.item
  }
  toggleEditing = () => {
    if (this.state.editing) {
      if (this.state.name.trim() !== '') {
        this.props.updateItem(this.props.id, this.state.name)
      }
    }
    this.setState({name: this.props.item, editing: !this.state.editing})
  }
  updateItemName = (ev) => {
    this.setState({name: ev.target.value})
  }
  renderName = () => {
    return <div>
      <span onDoubleClick={this.toggleEditing}>{this.props.item}</span>
    </div>
  }
  deleteItem = () => {
    this.props.deleteItem(this.props.id)
    this.setState({editing: false})
  }
  renderEdit = () => {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
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