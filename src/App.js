// Imports
import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import GameBoard from './containers/gameboard'
import Login from './components/login'
import Homepage from './components/homepage'
import Createaccount from './components/createaccount'
import Cow from './images/cow.png'
import Chick from './images/chick.png'
import Horse from './images/horse.png'
import Mouse from './images/mouse.png'
import Pig from './images/pig.png'
import Rooster from './images/rooster.png'
import Farm from './images/farm.jpg'

// Some vars that shouldn't be state
const emojis = [Cow, Chick, Horse, Mouse, Pig, Rooster, Farm]
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
    user_name: undefined,
    user_emoji: emojis[0],
    opponent_emoji: '',
    logged_in: false,
    winner: 0
  }


  // Reset game with fresh data
  handleResetClick = (event) => {
    this.sub.send({ array: ticTacToeReset, id: 1 })
  }
// Write game conditionals for gameplay and winner
  ticTacToeCheck(){
    if(this.state.array[0] === this.state.array[1] && this.state.array[0] === this.state.array[2]){
      this.setState({winner: this.state.array[0].id})
    } else if (this.state.array[3] === this.state.array[4] && this.state.array[5] === this.state.array[3]){
      this.setState({winner: this.state.array[3].id})
    } else if (this.state.array[6] === this.state.array[7] && this.state.array[8] === this.state.array[6]){
      this.setState({winner: this.state.array[6].id})
    } else if (this.state.array[0] === this.state.array[3] && this.state.array[6] === this.state.array[0]){
      this.setState({winner: this.state.array[0].id})
    } else if (this.state.array[1] === this.state.array[4] && this.state.array[7] === this.state.array[1]){
      this.setState({winner: this.state.array[1].id})
    } else if (this.state.array[2] === this.state.array[5] && this.state.array[8] === this.state.array[2]){
      this.setState({winner: this.state.array[2].id})
    } else if (this.state.array[0] === this.state.array[4] && this.state.array[8] === this.state.array[0]){
      this.setState({winner: this.state.array[0].id})
    } else if (this.state.array[2] === this.state.array[4] && this.state.array[6] === this.state.array[2]){
      this.setState({winner: this.state.array[2].id})
    } else {
      return 'Nope'
    }
  }

  //load and connect
  componentDidMount() {
    fetch('http://localhost:3001/games/1')
      .then(res => res.json())
      .then(json => {
        // this.setState({array: json.array})
      })
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('GamesChannel', {
      received: this.handleReceiveNewData
    })
  }

  // Set state with incoming data
  handleReceiveNewData = (data) => {
    console.log(data.array)
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
    // console.log(this.ticTacToeCheck())
  }

  getProfile = () => { //get profile of user
    let token = this.getToken()
    console.log(token)
    fetch('http://localhost:3001/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('profile', data)
        if(data.message){
          alert('line 129') //replace with data.message - could potentially delete this line
        } else {
          this.setState({user_id: data.user.id, user_name: data.user.name, logged_in: true})
        }
      })
  }

  getToken(){
    let token = localStorage.getItem('jwt')
    return token //keep redundancy - was giving error without explicit
  }

  saveToken(jwt){
    return localStorage.setItem('jwt', jwt)
  }

  handleLogin = (e, name, pw) => {
    e.preventDefault()
    let url = 'http://localhost:3001/login'
    let config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, password: pw})
    }
    fetch(url, config)
      .then(resp => resp.json())
      .then( data => {
        if(data.message){
          alert(data.message)
        } else {
          console.log(data)
          this.saveToken(data.jwt)
          this.getProfile()
        }
      })
  }

  createAccount = (e, name, pw) => {
    e.preventDefault()
    let url = 'http://localhost:3001/users'
    let config = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, password: pw})
    }
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({user_id: data.user.id, user_name: data.user.name, logged_in: true})
      })
  }

 //some form of user input for testing

  render() {
    return (
      <Router>

         <Route exact path='/login' component={() => <Login handleLogin={this.handleLogin}
                                                            logged_in={this.state.logged_in} />}/>
         <Route exact path='/tictactoe' component={() => <GameBoard handleResetClick={this.handleResetClick}
                                                                    array={this.state.array}
                                                                    clickHandle={this.clickHandle}
                                                                    userEmoji={this.state.user_emoji} />}/>
          <Route exact path='/homepage' component={() => <Homepage handleResetClick={this.handleResetClick}
                                                                   userEmoji={this.state.user_emoji}
                                                                   emojis={emojis}
                                                                   handleEmojiChoice={this.setUserEmoji}
                                                                   user_id={this.state.user_id}
                                                                   user_name={this.state.user_name} />}/>
          <Route exact path ='/createaccount' component={() => <Createaccount createAccount={this.createAccount}
                                                                  logged_in={this.state.logged_in}/>}/>
      </Router>
    )
  }

}

export default App
