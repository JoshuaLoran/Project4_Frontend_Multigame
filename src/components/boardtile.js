// Imports
import React, { Component } from 'react'

// class workings and export
export default class BoardTile extends Component {

  // Render the tile with interactions attached
  render(){
    return(
      <td onClick={this.props.onClick}
          id={this.props.idPass}
          className={this.props.classPass}>
          {/* set image to array value */}
     <img src={this.props.tileInfo.user_emoji} alt=''></img>
      </td>
    )
  }
}
