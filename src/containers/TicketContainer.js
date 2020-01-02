import React from 'react';
// import TicketItem from '../Components/TicketItem'
import TicketPage from './TicketPage';
import NewTicketForm from './NewTicketForm'
import TicketsList from './TicketsList'

import { Route, Switch } from 'react-router-dom';

class TicketContainer extends React.Component {

  fitlerOwnTickets = () => {
    if (this.props.currentUser && this.props.currentUser.attributes.agent) {
      return this.props.tickets.filter(ticket => ticket.attributes.owner_id === parseInt(this.props.currentUser.id)).sort((a, b) => b.attributes.created_at.localeCompare(a.attributes.created_at))

    } else {
      return this.props.tickets.filter(ticket => ticket.attributes.customer_id === parseInt(this.props.currentUser.id)).sort((a, b) => b.attributes.created_at.localeCompare(a.attributes.created_at))

    }
  }

  openTickets = () => {
    return this.props.tickets.filter(ticket => ticket.attributes.open ).sort((a, b) => b.attributes.created_at.localeCompare(a.attributes.created_at))

  }

  closedTickets = () => {
    return this.props.tickets.filter(ticket => !ticket.attributes.open ).sort((a, b) => b.attributes.created_at.localeCompare(a.attributes.created_at))
  
  }

  render(){
    return (
      <div className="ticket-container">
        <Switch>
          <Route path="/tickets/closed" render={(routerProps) => <TicketsList {...routerProps} title="Closed" tickets={this.closedTickets()} />}/> 
          <Route path="/tickets/open" render={(routerProps) => <TicketsList {...routerProps} title="Open" tickets={this.openTickets()} />}/>
          <Route path="/tickets/new" render={(routerProps) => <NewTicketForm {...routerProps}
                                                                              createMessage={this.props.createMessage} 
                                                                              createTicket={this.props.createTicket} 
                                                                              currentUser={this.props.currentUser} /> } />
          <Route path="/tickets/:id" render={(routerProps) => <TicketPage {...routerProps}
                                                                          loaded={this.props.loaded}
                                                                          selectedTicket={this.props.tickets.find(ticket => ticket.id === routerProps.match.params.id)}
                                                                          createMessage={this.props.createMessage} 
                                                                          currentUser={this.props.currentUser} 
                                                                          messages={this.props.messages}
                                                                          toggleTicket={this.props.toggleTicket}
                                                                          users={this.props.users}
                                                                          setOwnerToUser={this.props.setOwnerToUser}/>} />
          
          <Route path="/tickets" render={(routerProps) => <TicketsList {...routerProps} title="My" tickets={this.fitlerOwnTickets()}/>} />
        </Switch>
      </div>
    );
  }
}

export default TicketContainer;

