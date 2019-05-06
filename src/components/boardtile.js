import React, { Component } from 'react'

export default class BoardTile extends Component {

  render(){
    return(
      <td onClick={this.props.onClick} id={this.props.idPass} className={this.props.classPass}></td>
    )


  }
}
