import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Createaccount extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: undefined,
      password: undefined
    }
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  render (){
    const loggedIn = this.props.logged_in

    if(loggedIn === true){
      return <Redirect to='/homepage'/>
    }
    return (
      <div>
      <h2> Create New Account </h2>
      <input type="text" placeholder="username"  name="name" onChange={this.handleChange}/> <br/>
      <input className="pwfield" type="password" placeholder="password" name="pw"  onChange={this.handleChange} required/> <br/>
      <input className="btn btn-success btn-lg btn3d" type="submit" value="create account" onClick={(e) => {this.props.createAccount(e,this.state.name, this.state.pw)}} /> <br/>
      </div>
    )
  }

}
