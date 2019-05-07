// Imports
import React, { Component, Fragment } from 'react'

//class workings and export
export default class EmojiOptions extends Component {

render(){
  return(
    <Fragment>
      {/* iterate over emojis mapping interactions */}
      {this.props.emojis.map((emoji, idx) => {
        if (idx === 6){
          return
        }
        return <img onClick={this.props.handleEmojiChoice} key={idx} id={idx} src={emoji} alt="BrokeAF"></img>
      })}
    </Fragment>
  )
}
}
