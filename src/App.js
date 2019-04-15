import React, { Component } from 'react';

import './App.css';
import Layout from './hoc/Layout/Layout';
import HomePage from './components/Home/HomePage'
import TicketExchange from './containers/TicketExchange/TicketExchange'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/ticket-exchange" component={TicketExchange}></Route>
        <Route path="/" component={HomePage}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    )
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);