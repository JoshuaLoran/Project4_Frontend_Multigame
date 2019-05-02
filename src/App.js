import React, { Component } from 'react'
import './App.css'
import ActionCable from 'actioncable'

class App extends Component {
  state = {
    array: []
  }

  componentDidMount() {
    window.fetch('http://localhost:3001/games/1')
      .then(res => res.json())
      .then(json => console.log(json))


      // .then(json => this.setState({
      //   array: json.array
      // }))


/////   UNMODIFIED BELOW      /////////
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('GamesChannel', {
      received: this.handleReceiveNewText
    })
  }

  handleReceiveNewData = (data) => {
    console.log(data)
    // if (data !== this.state.array) {
    //   this.setState({ text })
    // }
  }

  handleChange = e => {
    let newArr = e.target.value
    console.log(e.target.value)
    this.setState({ array: newArr })
    this.sub.send({ array: newArr, id: 1 })
  }

  render() {
    return (
      <textarea
        value={JSON.stringify(this.state.array)}
        onChange={this.handleChange}
      />
    )
  }
}

export default App
