import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import GameBoard from './containers/gameboard'

class App extends Component {
  // Setup a gameboard
  state = {
    array: [0,0,0,0,0,0,0,0,0],
    user: 1
  }

  //load and connect
  componentDidMount() {
    window.fetch('http://localhost:3001/games/1')
      .then(res => res.json())
      .then(json => this.setState({
        array: json.array
      }))
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('GamesChannel', {
      received: this.handleReceiveNewData
    })
  }

  // Set state with incoming data
  handleReceiveNewData = (data) => {
    console.log(data)
    if (data.array !== this.state.array) {
      this.setState({
        array: data.array
      })
    }
  }

  // Handle gameboard click
  clickHandle = (event) => {
    console.log(event.target.id)
    let newArr = this.state.array
    for (let i=0; i<newArr.length; i++){
      if (i === event.target.id-1) {//should add user control of spaces
        newArr[i] = "works" /// '1' should be changed to USER ID
      }
    }
    this.sub.send({ array: newArr, id: 1 })
  }

  // Convert input into array and send it to the backend
  handleChange = e => {
    this.sub.send({ array: e.target.value.split(''), id: 1 })
  }


 //some form of user input for testing
  render() {
    return (
      <div>
        <textarea onChange={this.handleChange} />
        <GameBoard clickHandle={this.clickHandle} handleChange={this.handleChange} />

      </div>
    )
  }
}

export default App
