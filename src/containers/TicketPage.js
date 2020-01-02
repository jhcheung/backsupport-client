import React from 'react';
import TicketInfo from '../components/TicketInfo'
import MessagesList from './MessagesList'
import NewMessageForm from '../components/NewMessageForm'
import { Row, Col } from 'react-bootstrap'

class TicketPage extends React.Component {



  render() {
    console.log(this.props.selectedTicket)
    const ticketMessages = this.props.messages.filter(message => message.relationships.ticket.data.id === this.props.match.params.id)

    return (
      this.props.selectedTicket 
      ?
        <>
        <h2>{this.props.selectedTicket.attributes.title}</h2>
        <Row className="show-grid" float="center">
            <Col xs={3} >
            </Col>
            <Col xs={6}  className="ticket-page">
                <TicketInfo currentUser={this.props.currentUser} ticket={this.props.selectedTicket} toggleTicket={this.props.toggleTicket} users={this.props.users} setOwnerToUser={this.props.setOwnerToUser} />
                <MessagesList users={this.props.users} messages={ticketMessages} currentUser={this.props.currentUser}/>
                { this.props.selectedTicket.attributes.open 
                ? 
                  <NewMessageForm currentUser={this.props.currentUser} createMessage={this.props.createMessage} selectedTicketId={this.props.match.params.id}/>
                : null
                }
              </Col>
            <Col xs={3}>
            </Col>
        </Row>
        </>
      : null
    );
  }
}

export default TicketPage;

