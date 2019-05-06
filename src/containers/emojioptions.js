import React, { Component, Fragment } from 'react'

export default class EmojiOptions extends Component {


render(){

  return(
    <Fragment>
      {this.props.emojis.map((emoji, idx) => {
        return <img onClick={this.props.handleEmojiChoice} key={idx} id={idx} src={emoji} alt="BrokeAF"></img>
      })}
    </Fragment>
  )
}
}
