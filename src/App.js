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
    errorMessage: "",
    tickets: [],
    messages: []
  }

  componentDidMount() {
    if (this.state.currentUser) {
      requests.fetchTickets()
        .then(data => this.setState({tickets: data.tickets.data}))
      requests.fetchMessages()
        .then(data => this.setState({tickets: data.messages.data}))

    }
    if(localStorage.token) {
      requests.fetchProfile()
        .then(data => {
          if (data.user) {
            this.setState({ currentUser: { ...data.user.data } })
          } 
        })
    }
  }

  login = (userCreds) => {
    requests.login(userCreds)
      .then(data => {
        if (data.user) {
          this.setState({ currentUser: { ...data.user.data } }) 
          localStorage.token = data.jwt
        } else if (data.error) {
          this.setState({ error: data.error })
        } else {
          this.setState({ errorMessage: data.errorMessage })
        }
      })
  }

  signup = (userCreds) => {
    requests.createUser(userCreds)
      .then(data => {
        if (data.user) {
          this.setState({ currentUser: { ...data.user.data } }) 
          console.log(data.user)
          localStorage.token = data.jwt
        } else if (data.error) {
          this.setState({ error: data.error })
        } else {
          this.setState({ errorMessage: data.errorMessage })
        }
      })  
  }

  logout = () => {
    this.setState({
      currentUser: null, 
      errorMessage: "You've successfully been logged out!"
    }, () => {
      localStorage.removeItem("token")
      this.props.history.push("/login")
    })
  }

  createTicket = (ticketDetails) => {
    requests.createTicket(ticketDetails)
      .then(data => {
          if (data.ticket) {
            this.setState(prevState => {
              return( {
                tickets: [...prevState.tickets, {...data.ticket.data}]
              })
            })
          }
      })
  }

  createMessage = (messageDetails) => {
    requests.createMessage(messageDetails)
      .then(data => {
        if (data.message) {
          this.setState(prevState => {
            return(
              {
                messages: [...prevState.messages, {...data.message.data}]
              }
            )
          })
        }
      })
  }

  
  render() {
    console.log(this.state.currentUser, localStorage.token)
    return (
      <div className="App">
        <NavBar {...this.props} currentUser={this.state.currentUser} logout={this.logout}/>
        { this.state.errorMessage ? <ErrorMessage errorMessage={this.state.errorMessage}/> : null }
        <Switch>
            {/* <Route path="/movies" render={(routerProps) => <MovieContainer movies={this.state.movies} {...routerProps}/>}/> */}
            {/* <Route path="/home" render={() => <WelcomePage />}/> */}
            <Route exact path="/tickets" />
            <Route path="/admin/signup">
              { this.state.currentUser ? <Redirect to="/tickets/new" /> : <Signup signup={this.signup} admin={true} agent={true}/>}
            </Route>
            <Route path="/login">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Login login={this.login}/>}
            </Route>
            <Route path="/signup">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Signup signup={this.signup}/>}
            </Route>
            <Route exact path="/tickets/new">
              {this.state.currentUser ? <NewTicketForm createMessage={this.createMessage} createTicket={this.createTicket} currentUser={this.state.currentUser}/> : <Redirect to="/login" />}
            </Route>
            {/* <Route exact path="/" render={() => <div>Whats up I'm the welcome page!!!</div>} /> */}
            {/* <Route path="" render={() => <div><h1>NOT FOUND</h1>YOU ARE SOMEWHERE RANDOM</div>}/> */}
          </Switch>
      </div>
    );
  }
}

export default App;
