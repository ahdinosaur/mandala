import React, { Component } from 'react'
import './App.css'

import Loop from './Loop'
import Mandala from './Mandala'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Loop
          render={({ time}) => (
            <Mandala
              time={time}
            />
          )}
        />
      </div>
    )
  }
}

export default App
