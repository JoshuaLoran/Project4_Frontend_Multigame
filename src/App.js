import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import GameBoard from './containers/gameboard'
import Login from './components/login'

const ticTacToeReset = [{id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''},
                        {id: 0, user_emoji: ''}
                        ]

class App extends Component {
  // Setup a gameboard
  state = {
    array: ticTacToeReset,
            user_id: 0,
            userEmoji: ''
  }

  // Let the user choose an emoji
  setUserEmoji = (animal) => {
    switch (animal) {
      case 'pig': {
       let pig = require('./image' + animal + '.png')
        this.setState({
          userEmoji: pig
        })
        break;
      }
      case 'cow': {
        let cow = require('./image' + animal + '.png')
        this.setState({
          userEmoji: cow
        })
        break;
      }
      case 'horse': {
        let horse = require('./image' + animal + '.png')
        this.setState({
          userEmoji: horse
        })
        break;
      }
      case 'mouse': {
        let mouse = require('./image' + animal + '.png')
        this.setState({
          userEmoji: mouse
        })
        break;
      }
      case 'rooster': {
        let rooster = require('./image' + animal + '.png')
        this.setState({
          userEmoji: rooster
        })
        break;
      }
      default: {
        let chick = require('./image/chick.png')
        this.setState({
          userEmoji: chick
        })
      }
    }
  }


  handleResetClick = (event) => {
    this.sub.send({ array: ticTacToeReset, id: 1 })
  }

  //load and connect
  componentDidMount() {
    fetch('http://localhost:3001/games/1')
      .then(res => res.json())
      .then(json => {

        this.setState({array: json.array})
      })
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('GamesChannel', {
      received: this.handleReceiveNewData
    })
  }



  // Set state with incoming data
  handleReceiveNewData = (data) => {
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
        newArr[i] = {id: this.state.user_id, user_emoji: this.state.user_emoji} /// '1' should be changed to USER ID
      }
    }
    this.sub.send({ array: newArr, id: 1 })
  }

  // Convert input into array and send it to the backend
  handleChange = e => {
    this.sub.send({ array: e.target.value.split(''), id: 1 })
  }

  handleLogin = (e, name) => {
    e.preventDefault()
    let url = 'http://localhost:3001/users'
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'},
      body: JSON.stringify({name: name})
    }

    fetch(url, config)
      .then(resp => resp.json())
      .then(data =>
        this.setState({user_id: data.id}))
  }


 //some form of user input for testing




  render() {
    return (
      <Router>
         <Route exact path='/login' component={() => <Login handleLogin={this.handleLogin}/>}/>
         <Route exact path='/tictactoe' component={() => <GameBoard handleResetClick={this.handleResetClick}
                                                                    array={this.state.array}
                                                                    clickHandle={this.clickHandle}
                                                                    userEmoji={this.state.user_emoji} />}/>
      </Router>
    )
  }

}

export default App
