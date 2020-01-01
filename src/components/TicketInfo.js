import React from 'react'

export default function TicketInfo({ ticket }) {

    
    return (
        <>
        <div className="ticket-info">
            {/* <h2>{ticket.owner && ticket.owner.username}</h2>
            <h4>{ticket.customer.username}</h4> */}
            <div>{ticket.attributes.title}</div>
            <div>{ticket.attributes.open ? "Open" : "Closed"}</div>

        </div>
        {/* <div className="reviews-container">
            <h2>Reviews</h2>
            <button onClick={this.toggleNewReviewForm}>{this.state.addingReview ? "Close Form" : "Open Form"}</button>
            {this.state.addingReview && <NewReviewForm ticketId={selectedMovie.id} toggleNewReviewForm={this.toggleNewReviewForm}/>}
            {this.renderReviews(selectedMovie)}
        </div> */}
        </>
    )
    
}