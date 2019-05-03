import React, { Component } from 'react'

export default class GameBoard extends Component {
  constructor(){
    super()
    this.state = {
      winner: 0
    }
  }

  clickHandle = (event) => {
    console.log(event.target)
  }

  render(){
    return(
      null
    )
  }
}
