import React, {Component} from 'react'

export default class Item extends Component {
  state = {
    editing: false,
    name: this.props.item.name
  }
  toggleEditing = () => {
    if (this.state.editing) {
      this.props.updateNamedItemInAllOutfits(this.props.item.id, this.state.name)
    }
    this.setState({name: this.props.item.name, editing: !this.state.editing})
  }
  updateItemName = (ev) => {
    this.setState({name: ev.target.value})
  }
  renderName = () => {
    return <li onDoubleClick={this.toggleEditing}>{this.props.item.name}</li>
  }
  deleteItem = () => {
    this.props.deleteNamedItem(this.props.item.id)
    this.setState({editing: false})
  }
  renderEdit = () => {
    return (
      <li>
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
      </li>
    )
  }
  render () {
    return this.state.editing ? this.renderEdit() : this.renderName()
  }
}