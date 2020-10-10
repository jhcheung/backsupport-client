import React, {Component} from 'react'
import './MessageBubble.css'

export default class MessageBubble extends Component {
    render () {
        const {message, currentUser, users} = this.props 
         
        let [dateCreated, timeCreated] = message.attributes.created_at.split("T")

        const username = users.find(user => user.id === message.relationships.user.data.id).attributes.username

        timeCreated = timeCreated.substring(0, timeCreated.length - 5)

        return (
            <div className={`${currentUser.id === message.relationships.user.data.id ? "outgoing" : "incoming"}`}>
                <div className={`message-bubble ${currentUser.id === message.relationships.user.data.id ? "sent-message" : "received-message"}`}>
                        <p>{message.attributes.content}</p>     
                        <span className="time-date">{username + " | " + dateCreated + " | " + timeCreated}</span>           
                </div>
            </div>
        )

    }
}