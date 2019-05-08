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
          return null
        }
        return <img className={this.props.passedClass}  tabIndex="0" onClick={this.props.handleEmojiChoice} key={idx} id={idx} src={emoji} alt="animal"></img>
      })}
    </Fragment>
  )
}
}
