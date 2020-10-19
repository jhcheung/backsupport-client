import React from 'react'
import {Button} from 'react-bootstrap'

export default function TicketInfo({ ticket, toggleTicket, users, setOwnerToUser, currentUser }) {


    const handleClose = () => {
        toggleTicket(ticket.id)
    }

    const userFromId = (id) => {
        return users.find(user => user.id === id)
    }
    
    return (
        <div className="ticket-info">
            <h2> Support Agent: {ticket.relationships.owner.data ? userFromId(ticket.relationships.owner.data.id).attributes.username : "none"}</h2>
            {!ticket.relationships.owner.data && currentUser.attributes.agent ? <Button onClick={() => setOwnerToUser(ticket.id)} variant="success">Take Ticket</Button> : null}
            <h4> Customer: {ticket.relationships.customer.data ? userFromId(ticket.relationships.customer.data.id).attributes.username : "none"}</h4>
            <div>Status: {ticket.attributes.open ? "Open" : "Closed"}</div>
            {(currentUser.attributes.agent || currentUser.id === ticket.relationships.customer.data.id) ? <Button variant="primary" onClick={handleClose}>{ticket.attributes.open ? "Close Ticket" : "Open Ticket"}</Button> : null }
        </div>
    )
    
}