import React, { Component } from 'react'
import BoardTile from '../components/boardTile.js'

export default class GameBoard extends Component {
  constructor(){
    super()
    this.state = {
      winner: 0,
      classVert: "vert",
      classHori: "hori",
      classVertHor: "vert hori"
    }
  }

  render(){
    console.log(this.props.array.slice(0, 3))
    console.log(this.props.array.slice(3, 6))
    console.log(this.props.array.slice(6, 9))


    return(
      <div>
        <h1>Tic Tac Toe</h1>
        <button onClick={this.props.handleResetClick}>New game</button>
        <table>
          <tr>
            {this.props.array.slice(0,3).map((element, idx) => {
              if (idx === 1){
                return <BoardTile idPass={idx + 1} onClick={this.props.clickHandle} classPass={this.state.classVert}/>
              } else {
                return <BoardTile idPass={idx + 1}onClick={this.props.clickHandle} />
              }
            })}
          </tr>
          <tr>
            {this.props.array.slice(3,6).map((element, idx) => {
              if (idx === 1){
                return <BoardTile idPass={idx + 4} onClick={this.props.clickHandle} classPass={this.state.classVertHor}/>
              } else {
                return <BoardTile idPass={idx + 4} classPass={this.state.classHori} onClick={this.props.clickHandle} />
              }
            })}
          </tr>
          <tr>
            {this.props.array.slice(6,9).map((element, idx) => {
              if (idx === 1){
                return <BoardTile idPass={idx + 7} onClick={this.props.clickHandle} classPass={this.state.classVert}/>
              } else {
                return <BoardTile idPass={idx + 7} onClick={this.props.clickHandle} />
              }
            })}
          </tr>
        </table>
      </div>
    )
  }
}
