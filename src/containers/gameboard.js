// imports
import React, { Component, Fragment } from 'react'
import BoardTile from '../components/boardtile.js'

// class workings and export
export default class GameBoard extends Component {
  constructor(){
    super()
    this.state = {
      classVert: "vert",
      classHori: "hori",
      classVertHor: "vert hori",
    }
  }
  // Render the gameboard by mapping the game array and it's interactions over the board
  render(){
    return(
      <Fragment>
        <h1>Tic Tac Toe</h1>
        <button onClick={this.props.handleResetClick}>New game</button>
        <div className="tictactoepg">
          <tbody>
            <tr>
              {this.props.array.slice(0,3).map((element, idx) => {
                if (idx === 1){
                  return <BoardTile tileInfo={element} key={idx} idPass={idx + 1} onClick={this.props.clickHandle} classPass={this.state.classVert}/>
                } else {
                  return <BoardTile tileInfo={element} key={idx} idPass={idx + 1}onClick={this.props.clickHandle} />
                }
              })}
            </tr>
            <tr>
              {this.props.array.slice(3,6).map((element, idx) => {
                if (idx === 1){
                  return <BoardTile tileInfo={element} key={idx} idPass={idx + 4} onClick={this.props.clickHandle} classPass={this.state.classVertHor}/>
                } else {
                  return <BoardTile tileInfo={element} key={idx} idPass={idx + 4} classPass={this.state.classHori} onClick={this.props.clickHandle} />
                }
              })}
            </tr>
            <tr>
              {this.props.array.slice(6,9).map((element, idx) => {
                if (idx === 1){
                  return <BoardTile tileInfo={element} key={idx} idPass={idx + 7} onClick={this.props.clickHandle} classPass={this.state.classVert}/>
                } else {
                  return <BoardTile tileInfo={element} key={idx} idPass={idx + 7} onClick={this.props.clickHandle} />
                }
              })}
            </tr>
          </tbody>
        </div>
      </Fragment>
    )
  }
}
