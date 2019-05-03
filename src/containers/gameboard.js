import React, { Component } from 'react'

export default class GameBoard extends Component {
  constructor(){
    super()
    this.state = {
      winner: 0
    }
  }

  render(){
    return(
      <div>
        <h1>Tic Tac Toe</h1>
        <table>
          <tr>
            <td id="1" onClick={this.props.clickHandle} />
            <td id="2" onClick={this.props.clickHandle} className="vert"></td>
            <td id="3" onClick={this.props.clickHandle} />
          </tr>
          <tr>
            <td id="4" onClick={this.props.clickHandle} className="hori" />
            <td id="5" onClick={this.props.clickHandle} className="vert hori"></td>
            <td id="6" onClick={this.props.clickHandle} className="hori" />
          </tr>
          <tr>
            <td id="7" onClick={this.props.clickHandle} />
            <td id="8" onClick={this.props.clickHandle} className="vert"></td>
            <td id="9" onClick={this.props.clickHandle} />
          </tr>
        </table>
      </div>
    )
  }
}
