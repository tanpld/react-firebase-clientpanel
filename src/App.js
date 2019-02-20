import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import AppNavBar from './components/layout/AppNavBar'
import Dashboard from './components/layout/Dashboard'
import AddClient from './components/clients/AddClient'
import ClientDetails from './components/clients/ClientDetails'
import EditClient from './components/clients/EditClient'
import Login from './components/auth/Login'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavBar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/:id"
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
