import React, { Component } from 'react'

export default class BoardTile extends Component {
  constructor(){
    super()
    this.state = {
      winner: 0
    }
  }

  render(){
    return(
      <td src='./images/1f42d.png' onClick={this.props.onClick} id={this.props.idPass} className={this.props.classPass}></td>
    )
  }
}
