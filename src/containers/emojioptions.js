import React, { Component, Fragment } from 'react'

export default class EmojiOptions extends Component {


render(){

  return(
    <div>
      {this.props.emojis.map(emoji => {
        return <img src={emoji}></img>
      })}
    </div>
  )
}
}
