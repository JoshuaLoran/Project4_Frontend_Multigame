// Imports
import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import GameBoard from './containers/gameboard'
import Login from './components/login'
import Cow from './images/cow.png'
import Chick from './images/chick.png'
import Horse from './images/horse.png'
import Mouse from './images/mouse.png'
import Pig from './images/pig.png'
import Rooster from './images/rooster.png'

// Some vars that shouldn't be state
const emojis = [Cow, Chick, Horse, Mouse, Pig, Rooster]
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

// The class and it's workings
class App extends Component {

  // Setup a gameboard
  state = {
    array: ticTacToeReset,
    user_id: 0,
    user_emoji: emojis[0],
    opponent_emoji: '',
    logged_in: false,
  }

  // Reset game with fresh data
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

  //Collect users emojii choice
  setUserEmoji = (event) => {
    this.setState({
      user_emoji: emojis[event.target.id]
    })
  }

  // Handle gameboard click
  clickHandle = (event) => {
    let newArr = this.state.array
    for (let i=0; i<newArr.length; i++){
      if (i === event.target.id-1) {
        newArr[i] = {id: this.state.user_id, user_emoji: this.state.user_emoji}
      }
    }
    this.sub.send({ array: newArr, id: 1 })
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
        this.setState({user_id: data.id, logged_in: true}))
  }

 //some form of user input for testing

  render() {
    return (
      <Router>
         <Route exact path='/login' component={() => <Login handleLogin={this.handleLogin}
                                                            logged_in={this.state.logged_in}
                                                            userEmoji={this.state.user_emoji}
                                                            emojis={emojis}
                                                            handleEmojiChoice={this.setUserEmoji} />}/>
         <Route exact path='/tictactoe' component={() => <GameBoard handleResetClick={this.handleResetClick}
                                                                    array={this.state.array}
                                                                    clickHandle={this.clickHandle}
                                                                    userEmoji={this.state.user_emoji} />}/>
      </Router>
    )
  }

}

export default App
