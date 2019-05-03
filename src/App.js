import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import GameBoard from './containers/gameboard'
import Login from './components/login'

class App extends Component {
  // Setup a gameboard
  state = {
    array: [0,0,0,0,0,0,0,0,0],
    user: 1,
    user_emoji: './images/1f42e',
    opponent_emoji: './images/1f437'
  }

  handleResetClick = (event) => {
    this.sub.send({ array: [0,0,0,0,0,0,0,0,0], id: 1 })
  }

  //load and connect
  componentDidMount() {
    fetch('http://localhost:3001/games/1')
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
        newArr[i] = this.state.user /// '1' should be changed to USER ID
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
      <Router>
         <Route exact path='/login' component={Login}/>
         <Route exact path='/tictactoe' component={() => <GameBoard handleResetClick={this.handleResetClick} array={this.state.array} clickHandle={this.clickHandle}/>}/>
      </Router>
    )
  }

}

export default App
