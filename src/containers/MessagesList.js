import React, {Component} from 'react'
import MessageBubble from '../components/MessageBubble'
import ScrollableFeed from 'react-scrollable-feed'
import "./MessagesList.css";


export default class MessageList extends Component {

    render() {
        return this.props.messages 
                ? 
                <div className="scrollable-feed">
                        <ScrollableFeed forceScroll={true}>
                            { this.props.messages.map((message, i) => <MessageBubble key={i} users={this.props.users} message={message} currentUser={this.props.currentUser} />) }
                        </ScrollableFeed>
                </div>
                : null
    }
}