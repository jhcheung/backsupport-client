import React, {Component} from 'react'

export default class TicketItem extends Component {

    handleClick = () => {
        this.props.history.push(`/tickets/${this.props.ticket.id}`)
    }

    render() {
        return (
            <div className={`ticket-list-item ${this.props.ticket.attributes.open ? "open" : "closed"}`} onClick={this.handleClick} >
                {this.props.ticket.attributes.title}
            </div>
        )
    }
}