import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: undefined,
      pw: undefined
    }
  }

  handleChange = e => {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    const loggedIn = this.props.logged_in

    if(loggedIn === true){
      return <Redirect to='/tictactoe'/>
    }
    return (

    <div>
      <h2> Login </h2>
      <form>
      <input type="text" placeholder="username" value={this.state.name} name="name" onChange={this.handleChange}/> <br/>
      <input type="password" placeholder="password" name="pw" value={this.state.pw} onChange={this.handleChange} required/> <br/>
      <input type="submit" value="Submit" onClick={(e) => {this.props.handleLogin(e,this.state.name, this.state.pw)}}/>
      </form>
    </div>)
  }
}
