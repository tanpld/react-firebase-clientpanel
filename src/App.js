import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppNavBar from './components/layout/AppNavBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavBar />
          <div className="container">test</div>
        </div>
      </Router>
    )
  }
}

export default App
