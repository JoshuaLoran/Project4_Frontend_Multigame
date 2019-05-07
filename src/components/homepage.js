import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Homepage extends Component {


  render(){
    //
    // const newGame = this.state.newGame
    //
    // if(newGame === true){
    //   return <Redirect to='/tictactoe'/>
    // }
    return (
      <div> <h2> Homepage </h2>
          <button> new tic tac toe game </button>
      </div>
    )
  }
}
