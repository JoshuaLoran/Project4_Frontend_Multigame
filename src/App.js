import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import GameBoard from './containers/gameboard'
import Login from './components/login'
import Homepage from './components/homepage'

class App extends Component {


    state = {
      array: [0,0,0,0,0,0,0,0,0],
      user_id: undefined,
      logged_in: false,
      user_emoji: './images/1f42e',
      opponent_emoji: './images/1f437'
    }


  // Setup a gameboard


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
    if (data.array !== this.state.array) {
      this.setState({
        array: data.array
      })
    }
    console.log(this.state.array)
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
    console.log(newArr)
    this.sub.send({ array: newArr, id: 1 })
  }

  // Convert input into array and send it to the backend
  handleChange = e => {
    this.sub.send({ array: e.target.value.split(''), id: 1 })
  }

  getProfile = () => { //get profile of user
    let token = this.getToken()
    fetch('http://localhost:3001/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('profile', data)
      })
  }

  getToken(jwt){
    return localStorage.getItem('jwt')
  }

  saveToken(jwt){
    localStorage.setItem('jwt', jwt)
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
        console.log(data)

        this.saveToken(data.jwt)
        this.getProfile()
        this.setState({user_id: data.user.id, logged_in: true})

      })

  }


 //some form of user input for testing




  render() {
    return (
      <Router>
         <Route exact path='/login' component={() => <Login handleLogin={this.handleLogin} logged_in={this.state.logged_in}/>}/>
         <Route exact path='/homepage' component={Homepage} />
         <Route exact path='/tictactoe' component={() => <GameBoard handleResetClick={this.handleResetClick} array={this.state.array} clickHandle={this.clickHandle}/>}/>

      </Router>
    )
  }

}

export default App
