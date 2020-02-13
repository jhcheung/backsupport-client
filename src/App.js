import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap'
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import Login from './containers/Login'
import Signup from './containers/Signup'
import TicketContainer from './containers/TicketContainer'
import * as requests from './requests'
import { ActionCableConsumer } from 'react-actioncable-provider'



import './App.css';

class App extends Component {

  state = {
    currentUser: null,
    errorMessage: "",
    tickets: [],
    messages: [],
    users: [],
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
                this.setState({tickets: json.data})
              })
            requests.fetchUsers()
              .then(json => {
                this.setState({users: json.data})
              })
            requests.fetchMessages()
              .then(json => {
                this.setState({messages: json.data, loaded: true})
              })
          } 
        })
    } else {
      this.setState({ loaded: true })
    }
  }


  componentDidUpdate() {
    setTimeout(() => this.setState({errorMessage:''}), 10000);
  }

  login = (userCreds) => {
    requests.login(userCreds)
      .then(json => {
        if (json.error) {
          this.setState({ errorMessage: json.error })
        } else if (json.data) {
          this.setState({ currentUser: { ...json.data } }) 
          localStorage.token = json.data.attributes.jwt_token
        } else {
          this.setState({ errorMessage: json.message })
        }
      })
  }

  signup = (userCreds) => {
    requests.createUser(userCreds)
      .then(json => {
        // console.log(json)
        if (json.error) {
          this.setState({ errorMessage: json.error })
        } else if (json.data.attributes) {
          this.setState({ currentUser: { ...json.data } }) 
          localStorage.token = json.data.attributes.jwt_token
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
      .then(json => {
          if (json.data) {
            // this.setState(prevState => {
            //   return( {
            //     tickets: [...prevState.tickets, {...json.data}]
            //   })
            // })
            this.createMessage({ message: { content: content, ticket_id: parseInt(json.data.id), user_id: parseInt(this.state.currentUser.id) }})
            this.props.history.push(`/tickets/${json.data.id}`)
          }
      })
    
  }

  addTicket = (ticket) => {
    const newTicket = ticket.data
    this.setState(prevState => {
      return( {
        tickets: [...prevState.tickets, newTicket]
      })
    })
}

  createMessage = (messageDetails) => {
    requests.createMessage(messageDetails)
      .then(json => {
        // if (json.data) {
        //   this.setState(prevState => {
        //     return(
        //       {
        //         messages: [...prevState.messages, {...json.data}]
        //       }
        //     )
        //   })
        // }
      })
  }

  addMessage = (message) => {
    const newMessage = message.data
    this.setState(prevState => {
      return(
        {
          messages: [...prevState.messages, newMessage]
        }
      )
    })
  }

  toggleTicket = (ticketId) => {
    requests.toggleTicket(parseInt(ticketId))
      .then(json => this.setState(prevState => ({
        tickets: prevState.tickets.map(ticket => {
          if (ticket.id === ticketId) {
            return json.data
          } else {
            return ticket
          }
        })
      })
      ))
  }

  setOwnerToUser = (ticketId, user=this.state.currentUser) => {
    requests.updateTicket(ticketId, { ticket: { owner_id: parseInt(user.id) }})
      .then(json => this.setState(prevState => ({
        tickets: prevState.tickets.map(ticket => {
          if (ticket.id === ticketId) {
            return json.data
          } else {
            return ticket
          }})
      })))
  }

 
  
  render() {
    // console.log(this.state)
    return (
      <div className="App">
        <ActionCableConsumer 
          channel={{ channel: "TicketsChannel"}}
          onReceived={
            (ticket) => this.addTicket(ticket)
          }
        />

        <NavBar {...this.props} currentUser={this.state.currentUser} logout={this.logout}/>
        { this.state.errorMessage ? <ErrorMessage errorMessage={this.state.errorMessage}/> : null }
        <Switch>
            {/* <Route path="/movies" render={(routerProps) => <MovieContainer movies={this.state.movies} {...routerProps}/>}/> */}
            {/* <Route path="/home" render={() => <WelcomePage />}/> */}

            <Route path="/tickets" render={() =>  
            this.state.loaded && !this.state.currentUser
            ? <Redirect to="/login" />
              : <TicketContainer tickets={this.state.tickets} 
                  addMessage={this.addMessage}
                  loaded={this.state.loaded}
                  users={this.state.users}
                  messages={this.state.messages}
                  currentUser={this.state.currentUser} 
                  createTicket={this.createTicket}
                  createMessage={this.createMessage}
                  history={this.props.history} 
                  toggleTicket={this.toggleTicket}
                  setOwnerToUser={this.setOwnerToUser}/>

              } />    

            <Route path="/admin/signup">
              { this.state.currentUser ? <Redirect to="/tickets/" /> : <Signup signup={this.signup} admin={true} agent={true}/>}
            </Route>
            <Route path="/login">
              {this.state.currentUser ? <Redirect to="/tickets/" /> : <Login login={this.login}/>}
            </Route>
            <Route path="/signup">
              {this.state.currentUser ? <Redirect to="/tickets/" /> : <Signup signup={this.signup}/>}
            </Route>
            <Route exact path="/" render={() => <Jumbotron style={{textAlign: 'left'}}>
                                                <h1>Back Support</h1>
                                                <p>
                                                  BackSupport is a ticketing system for support agents and customers, loosely based off Zendesk, the popular support SAAS platform.
                                                </p>
                                                <p>
                                                  <Button variant="primary" href="/signup">Get Started</Button>
                                            </p>
                                          </Jumbotron>
                                    } />
            {/* <Route path="" render={() => <div><h1>NOT FOUND</h1>YOU ARE SOMEWHERE RANDOM</div>}/> */}
          </Switch>
      </div>
    );
  }
}

export default App;
