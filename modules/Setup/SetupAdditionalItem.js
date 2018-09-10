import React, {Component} from 'react'

export default class SetupAdditionalItem extends Component {
  state = {
    editing: false,
    name: this.props.item.name
  }
  toggleEditing = () => {
    console.log('toggling editing')
    this.setState({editing: !this.state.editing})
  }

  updateName = (ev) => {
    this.setState({name: ev.target.value})
  }

  saveItem = () => {
    this.toggleEditing()
    this.props.saveEditedItem(this.state.name, this.props.item.id)
  }

  renderInput = () => {
    return (
      <span>
        <input
          value={this.state.name}
          type="text"
          onChange={this.updateName}
          autoFocus
          onFocus={ev => ev.target.select()}
          onBlur={this.saveItem}
          onKeyPress={(ev) => {ev.charCode === 13 ? this.saveItem() : null}}
        />
        <button onClick={this.saveItem}>Save</button>
      </span>
    )
  }

  renderName = () => {
    return <li onDoubleClick={this.toggleEditing}>{this.state.name}</li>
  }

  render () {    
    return (
      <div>
        {this.state.editing ? this.renderInput() : this.renderName()}
      </div>
    )
  }
}