import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import EmojiOptions from '../containers/emojioptions'


export default class Homepage extends Component {

  name(){
    let name = this.props.user_name.charAt(0).toUpperCase() + this.props.user_name.slice(1);
    return name
  }

  render(){


    this.props.changeNewGameState()
  
    if(this.props.logged_in === false){
      return <Redirect to='/'/>
    }
    if(this.props.newGame === 'tictactoe'){
      return <Redirect to='/tictactoe'/>
    }
    return (

      <div>  <h2> Welcome {this.name()}!</h2><br></br>
      <h4> Select an Avatar: </h4>
          <EmojiOptions passedClass={this.props.passedClass}
                        handleEmojiChoice={this.props.handleEmojiChoice}
                        userEmoji={this.props.userEmoji}
                        emojis={this.props.emojis}/>
            <h4 >Your Avatar: </h4>
            <img src={this.props.userEmoji} alt=''></img><br></br>

            <h4> Select a Game to Play: </h4>
            <button className="btn btn-success btn-lg btn3d" onClick={this.props.handleResetClick}>tic tac toe</button>

            <button className="btn btn-success btn-lg btn3d upprbtn" onClick={this.props.handleLogOut}> log out </button>
      </div>
    )
  }
}
