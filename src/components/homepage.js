import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import EmojiOptions from '../containers/emojioptions'

export default class Homepage extends Component {

  render(){

    if(this.props.logged_in === false){
      return <Redirect to='/login'/>
    }
    if(this.props.newGame === 'tictactoe'){
      return <Redirect to='/tictactoe'/>
    }
    return (
      <div> <h2> Welcome {this.props.user_name} <button onClick={this.props.handleResetClick}> new tic tac toe game </button></h2>

          <EmojiOptions handleEmojiChoice={this.props.handleEmojiChoice}
                        userEmoji={this.props.userEmoji}
                        emojis={this.props.emojis}/>
            <button onClick={this.props.handleLogOut}> log out </button>
      </div>
    )
  }
}
