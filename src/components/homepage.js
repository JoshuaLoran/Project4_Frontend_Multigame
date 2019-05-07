import React, { Component } from 'react'
import EmojiOptions from '../containers/emojioptions'

export default class Homepage extends Component {


  render(){
    //
    // const newGame = this.state.newGame
    //
    // if(newGame === true){
    //   return <Redirect to='/tictactoe'/>
    // }
    return (
      <div> <h2> Homepage </h2>
          <button onClick={this.props.handleResetClick}> new tic tac toe game </button>
          <EmojiOptions handleEmojiChoice={this.props.handleEmojiChoice} userEmoji={this.state.user_emoji} emojis={this.props.emojis}/>
      </div>
    )
  }
}
