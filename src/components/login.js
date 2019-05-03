import React, { Component } from 'react'


export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: undefined
    }
  }

  handleChange = e => {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return <div>
      <h2> Login </h2>
      <form>
      <input type="text" placeholder="username" value={this.state.username} name="username" onChange={this.handleChange}/> <br/>

      <input type="submit" value="Submit" onClick={(e) => {this.props.handleLogin(e,this.state.username)}}/>
      </form>
    </div>
  }
}
