import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import Login from './containers/Login'
import Signup from './containers/Signup'
import NewTicketForm from './containers/NewTicketForm'
import * as requests from './requests'



import './App.css';

class App extends Component {

  state = {
    currentUser: null,
    message: ""
  }

  componentDidMount() {
    if(localStorage.token) {
      requests.fetchProfile()
        .then(data => {
          if (data.user) {
            this.setState({ currentUser: data.user })
          } 
        })
    }
  }

  login = (userCreds) => {
    requests.login(userCreds)
      .then(data => {
        if (data.user) {
          this.setState({ currentUser: data.user }) 
          localStorage.token = data.jwt
        } else {
          this.setState({ message: data.message })
        }
      })
  }

  signup = (userCreds) => {
    requests.createUser(userCreds)
      .then(data => {
        if (data.user) {
          this.setState({ currentUser: data.user }) 
          localStorage.token = data.jwt
        } else {
          this.setState({ message: data.message })
        }
      })  
  }

  logout = () => {
    this.setState({
      currentUser: null, 
      message: "You've successfully been logged out!"
    }, () => {
      localStorage.removeItem("token")
      this.props.history.push("/login")
    })
  }

  
  render() {
    console.log(this.state, localStorage.token)
    return (
      <div className="App">
        <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
        { this.state.message ? <ErrorMessage message={this.state.message}/> : null }
        <Switch>
            {/* <Route path="/movies" render={(routerProps) => <MovieContainer movies={this.state.movies} {...routerProps}/>}/> */}
            <Route path="/login">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Login login={this.login}/>}
            </Route>
            <Route path="/signup">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Signup signup={this.signup}/>}
            </Route>
            <Route path="/tickets/new">
              {this.state.currentUser ? <NewTicketForm /> : <Redirect to="login" />}
            </Route>
            {/* <Route exact path="/" render={() => <div>Whats up I'm the welcome page!!!</div>} /> */}
            {/* <Route path="" render={() => <div><h1>NOT FOUND</h1>YOU ARE SOMEWHERE RANDOM</div>}/> */}
          </Switch>
      </div>
    );
  }
}

export default App;
