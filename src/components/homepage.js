import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import EmojiOptions from '../containers/emojioptions'


export default class Homepage extends Component {

  name(){
    let name = this.props.user_name.charAt(0).toUpperCase() + this.props.user_name.slice(1);
    return name
  }

  render(){

    if(this.props.logged_in === false){
      return <Redirect to='/'/>
    }
    if(this.props.newGame === 'tictactoe'){
      return <Redirect to='/tictactoe'/>
    }
    return (
      <div> <h2> Welcome {this.name()}</h2><br></br>
      <button onClick={this.props.handleResetClick}> new tic tac toe game </button><br></br><br></br>

          <EmojiOptions passedClass={this.props.passedClass}
                        handleEmojiChoice={this.props.handleEmojiChoice}
                        userEmoji={this.props.userEmoji}
                        emojis={this.props.emojis}/><br></br><br></br>

            <h2 className='bottom'>Your Avatar: </h2><br></br><img src={this.props.userEmoji} alt=''></img><br></br>
            <button className='bottom' onClick={this.props.handleLogOut}> log out </button>
      </div>
    )
  }
}
