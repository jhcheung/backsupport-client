import React, {Component} from 'react'
import TicketItem from '../components/TicketItem'
import './TicketsList.css'

import { Row, Col } from 'react-bootstrap'


export default class TicketsList extends Component {

    render() {
        return (
            <>
        <h2>{this.props.title + " Tickets"}</h2>
            <Row className="show-grid" float="center">
                <Col xs={3} >
                </Col>
                <Col xs={6}  className="ticket-list">
                    { this.props.tickets ? this.props.tickets.map(ticket => <TicketItem key={ticket.id} history={this.props.history} ticket={ticket} />) : null }
                </Col>
                <Col xs={3}>
                </Col>
            </Row>
            </>
        )
    }
}