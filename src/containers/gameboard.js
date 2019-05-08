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
      homePage: false,
    }
  }

  redirectToHomepage = () => {
    this.setState({homePage: true})
  }
  // Render the gameboard by mapping the game array and it's interactions over the board
  render(){
    const homePage = this.state.homePage
    if(homePage === true){
      return <Redirect to='/homepage'/>
    }
    return(
      <div>
        <div className='gameboarddiv'>
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
        <button className="btn btn-success btn-lg btn3d upprbtn" onClick={this.redirectToHomepage}> homepage</button>
          </div>
        </div>
    )
  }
}
