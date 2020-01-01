import React from 'react';
// import TicketItem from '../Components/TicketItem'
import TicketPage from './TicketPage';
import NewTicketForm from './NewTicketForm'

import { Route, Switch } from 'react-router-dom';

class TicketContainer extends React.Component {

  render(){
    return (
      <div className="ticket-container">
        <Switch>
          <Route path="/tickets/new" render={(routerProps) => <NewTicketForm {...routerProps}
                                                                              createMessage={this.props.createMessage} 
                                                                              createTicket={this.props.createTicket} 
                                                                              currentUser={this.props.currentUser} /> } />
          <Route path="/tickets/:id" render={(routerProps) => <TicketPage {...routerProps} tickets={this.props.tickets} />} />
          {/* <Route path="/tickets" render={() => this.props.tickets.map(ticket => <TicketItem key={ticket.id} handleClick={this.selectTicket} ticket={ticket} />)} /> */}
        </Switch>
      </div>
    );
  }
}

export default TicketContainer;

