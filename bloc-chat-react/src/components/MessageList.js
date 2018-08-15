import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            messages: [],
            newMessage: ''
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

    createMessage(e) {
        let newMessage = this.state.newMessage;
        let activeUser = this.props.activeUser;
        let timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
        let activeRoom = this.props.activeRoom;
        e.preventDefault();
        if (activeUser !== null) {
            this.messageRef.push({
                content: newMessage,
                roomID: activeRoom.key,
                sentAt: timeStamp,
                username: activeUser.displayName
            })
        } else {
            this.messageRef.push({
                content: newMessage,
                roomID: activeRoom.key,
                sentAt: timeStamp,
                username: 'Guest'
            })
        }
        this.setState({ newMessage: '' });
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }

    unixConverter(e) {
        var timeStamp = new Date(e);
        var month = timeStamp.getMonth()+1;
        var date = timeStamp.getDate();
        var year = timeStamp.getFullYear();
        var hours = timeStamp.getHours();
        let minutes = timeStamp.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : '12';
        minutes = minutes > 10 ? minutes : '0' + minutes;
        return (month+'/'+date+'/'+year+ ' at ' + hours + ':' + minutes + ampm);
    }

    render() {
        const listMessages = this.state.messages.filter( message => message.roomID === this.props.activeRoom.key);

        return(
            <div>
                <table>
                    <tbody>
                        {listMessages.map( (message, index) => 
                            <tr key={index}>
                                <td>{message.username}</td>
                                <td>{message.content}</td>
                                <td>{this.unixConverter(message.sentAt)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <form onSubmit = { (e) => {this.createMessage(e)} }>
                    <input 
                        type="text"
                        placeholder="Write you message here..."
                        value={this.state.newMessage}
                        onChange={ (e) => this.handleChange(e) }
                    />
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default MessageList;