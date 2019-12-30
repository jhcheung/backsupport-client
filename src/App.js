import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './containers/Login'
import Signup from './containers/Signup'
import NewTicketForm from './containers/NewTicketForm'
import * as requests from './requests'



import './App.css';

class App extends Component {

  state = {
    currentUser: null
  }

  componentDidMount() {

  }

  login = (userCreds) => {
    requests.login(userCreds)
      .then(data => this.setState({ currentUser: data }) )
  }

  signup = (userCreds) => {
    requests.createUser(userCreds)
      .then(data => this.setState({ currentUser: data }) )
  }

  
  render() {
    console.log(this.state.currentUser)
    return (
      <div className="App">
        <NavBar />
        <Switch>
            {/* <Route path="/movies" render={(routerProps) => <MovieContainer movies={this.state.movies} {...routerProps}/>}/> */}
            <Route path="/login">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Login login={this.login}/>}
            </Route>
            <Route path="/signup">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Signup signup={this.signup}/>}
            </Route>
            <Route path="/tickets/new" component={NewTicketForm}/>
            {/* <Route exact path="/" render={() => <div>Whats up I'm the welcome page!!!</div>} /> */}
            {/* <Route path="" render={() => <div><h1>NOT FOUND</h1>YOU ARE SOMEWHERE RANDOM</div>}/> */}
          </Switch>
      </div>
    );
  }
}

export default App;
