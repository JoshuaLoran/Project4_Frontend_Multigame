import React, { Component } from 'react'

export default class BoardTile extends Component {

  render(){
    console.log(this.props.tileInfo)
    return(
      <td onClick={this.props.onClick}
          id={this.props.idPass}
          className={this.props.classPass}>
          <img src={this.props.tileInfo} alt=''></img> 
      </td>
    )


  }
}
