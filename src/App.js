import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'

class App extends Component {
  // Setup a gameboard
  state = {
    array: []
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

  // Convert input into array and send it to the backend
  handleChange = e => {
    this.sub.send({ array: e.target.value.split(''), id: 1 })
  }

 //some form of user input for testing
  render() {
    return (
      <textarea
        onChange={this.handleChange}
      />

    )
  }
}

export default App
