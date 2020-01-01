import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import Login from './containers/Login'
import Signup from './containers/Signup'
import TicketContainer from './containers/TicketContainer'
import * as requests from './requests'



import './App.css';

class App extends Component {

  state = {
    currentUser: null,
    errorMessage: "",
    tickets: [],
    messages: [],
    loaded: false
  }

  componentDidMount() {

    if(localStorage.token) {
      requests.fetchProfile()
        .then(json => {
          if (json.data.attributes) {
            this.setState({ currentUser: { ...json.data } })
            requests.fetchTickets()
            .then(json => {
              this.setState({tickets: json.data, loaded: true})
            })    
          } 
        })
    } else {
      this.setState({ loaded: true })
    }
  }

  login = (userCreds) => {
    requests.login(userCreds)
      .then(json => {
        if (json.data.attributes) {
          this.setState({ currentUser: { ...json.data } }) 
          localStorage.token = json.data.attributes.jwt_token
        } else if (json.data.error) {
          this.setState({ error: json.error })
        } else {
          this.setState({ errorMessage: json.data.errorMessage })
        }
      })
  }

  signup = (userCreds) => {
    requests.createUser(userCreds)
      .then(json => {
        if (json.data.user) {
          this.setState({ currentUser: { ...json.data } }) 
          localStorage.token = json.data.attributes.jwt_token
        } else if (json.data.error) {
          this.setState({ error: json.error })
        } else {
          this.setState({ errorMessage: json.errorMessage })
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

  createTicket = (ticketDetails, content) => {
    requests.createTicket(ticketDetails)
      .then(data => {
          if (data.ticket) {
            this.setState(prevState => {
              return( {
                tickets: [...prevState.tickets, {...data.ticket.data}]
              })
            })
            this.createMessage({ message: { content: content, ticket_id: parseInt(data.ticket.data.id), user_id: parseInt(this.state.currentUser.id) }})
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
    console.log(this.state.loaded && !this.state.currentUser)
    return (
      <div className="App">
        <NavBar {...this.props} currentUser={this.state.currentUser} logout={this.logout}/>
        { this.state.errorMessage ? <ErrorMessage errorMessage={this.state.errorMessage}/> : null }
        <Switch>
            {/* <Route path="/movies" render={(routerProps) => <MovieContainer movies={this.state.movies} {...routerProps}/>}/> */}
            {/* <Route path="/home" render={() => <WelcomePage />}/> */}

            <Route path="/tickets" render={() =>  this.state.loaded && !this.state.currentUser
            
            ? <Redirect to="/login" />
              : <TicketContainer tickets={this.state.tickets} 
                  currentUser={this.state.currentUser} 
                  createTicket={this.createTicket}
                  createMessage={this.createMessage}
                  history={this.props.history} />

              } />    

            <Route path="/admin/signup">
              { this.state.currentUser ? <Redirect to="/tickets/new" /> : <Signup signup={this.signup} admin={true} agent={true}/>}
            </Route>
            <Route path="/login">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Login login={this.login}/>}
            </Route>
            <Route path="/signup">
              {this.state.currentUser ? <Redirect to="/tickets/new" /> : <Signup signup={this.signup}/>}
            </Route>
            {/* <Route exact path="/" render={() => <div>Whats up I'm the welcome page!!!</div>} /> */}
            {/* <Route path="" render={() => <div><h1>NOT FOUND</h1>YOU ARE SOMEWHERE RANDOM</div>}/> */}
          </Switch>
      </div>
    );
  }
}

export default App;
