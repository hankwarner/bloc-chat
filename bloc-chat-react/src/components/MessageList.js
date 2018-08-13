import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            messages: []
        }

        this.messageRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        });
    }

    render() {
        const listMessages = this.state.messages.filter( message => message.roomID === this.props.activeRoom.key)
        return(
            <table>
                <tbody>
                    {listMessages.map( (message, index) => 
                        <tr key={index}>
                            <td>{message.username}</td><td>{message.content}</td><td> {message.sentAt}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default MessageList;