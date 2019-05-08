// imports
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import BoardTile from '../components/boardtile.js'

// class workings and export
export default class GameBoard extends Component {
  constructor(){
    super()
    this.state = {
      classVert: "vert",
      classHori: "hori",
      classVertHor: "vert hori",
      homepage: false
    }
  }

  onClickRedirect = () => {
    this.setState({ homepage: true })
  }

  name(){
    let name = this.props.userName.charAt(0).toUpperCase() + this.props.userName.slice(1);
    return name
  }

  // Render the gameboard by mapping the game array and it's interactions over the board
  render(){
    if(this.state.homepage === true){
      return <Redirect to='/homepage'/>
    }
    return(
      <div>
        <div className='gameboarddiv'>
          <div className='upper-left'>
            <h2>{this.name()}</h2>
            <img src={this.props.userEmoji} alt=''></img>
            <h2>Wins: {this.props.userWins}</h2>
          </div>
          <div className='upper-right'>
            <h2>Opponent</h2>
            <img src={this.props.opponentEmoji} alt=''></img>
          </div>
        <h1>Tic Tac Toe</h1>
          <tbody className='table'>
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
          </tbody><br></br><br></br><br></br><br></br>

        <button className="btn btn-success btn-lg btn3d" onClick={this.props.handleResetClick}> new game</button>
        <button className="btn btn-success btn-lg btn3d upprbtn" onClick={this.onClickRedirect}> homepage</button>
          </div>
        </div>
    )
  }
}
