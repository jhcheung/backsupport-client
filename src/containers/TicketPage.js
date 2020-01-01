import React from 'react';
import TicketInfo from '../components/TicketInfo'

class TicketPage extends React.Component {
  state = {
    
  }

//   toggleNewReviewForm = () => {
//     this.setState((prevState) => ({ addingReview: !prevState.addingReview }))
//   }

//   renderSingleReview = (review) => {
//     return (
//       <div key={review.id} className="review-box">
//         <div>{review.stars > 0 ? "⭐️".repeat(review.stars) : "👎🏽"}</div>
//         <div>{review.content}</div>
//         <div>
//           <span className="review-author">According to {review.author_name}</span>
//           <span className="review-trash" onClick={() => this.deleteReview(review.id)}> &emsp;  🚮</span>
//         </div>
        
//       </div>
//     )
//   }

//   renderReviews = (selectedMovie) => {
//     return selectedMovie.reviews.length ? selectedMovie.reviews.map(review => this.renderSingleReview(review)) : "No reviews yet"
//   }

  render() {
    console.log(this.props)
    let selectedTicket = this.props.tickets.find(ticket => ticket.id === this.props.match.params.id)
    console.log(selectedTicket)
    return (
      <div className="ticket-page">
          {/* <div className="back-button" onClick={() => this.props.history.goBack()}>⬅️</div> */}
          {/* make sure selectedTicket isn't null before you try to render anything */}
          {selectedTicket && <TicketInfo ticket={selectedTicket} />} 
      </div>
    );
  }
}

export default TicketPage;

