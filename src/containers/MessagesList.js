import React, {Component} from 'react'
import MessageBubble from '../components/MessageBubble'

export default class MessageList extends Component {

    render() {
        return this.props.messages ? this.props.messages.map(message => <MessageBubble key={message.id} users={this.props.users} message={message} currentUser={this.props.currentUser} />) : null
    }
}