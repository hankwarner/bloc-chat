import React, { Component } from 'react';

class MessageList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            messages: [],
            newMessage: ''
        }

        this.messageRef = this.props.firebase.database().ref('messages');
        this.roomRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.messageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        })

        this.messageRef.on('child_removed', snapshot => {
            this.setState({ messages: this.state.messages.filter(message => message.key !== snapshot.key)})
        })
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

    convertUnix(e) {
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
    
    deleteMessage(e) {
        let messageKey = e.target.value;
        e.preventDefault();
        this.messageRef.child(messageKey).remove();
    }

    render() {
        const listMessages = this.state.messages.filter( message => message.roomID === this.props.activeRoom.key);

        return(
            <div className="mdl-grid">
                <div className="mdl-layout__content">

                    {listMessages.map( (message, index) => 
                        <ul className="demo-list-two mdl-list" key={index}>
                            <li className="mdl-list__item mdl-list__item--two-line">
                                <span className="mdl-list__item-primary-content">
                                    <i className="material-icons mdl-list__item-avatar">person</i>
                                    <span>{message.username}</span>
                                    <span className="mdl-list__item-sub-title">{message.content}</span>
                                </span>
                                <span className="mdl-list__item-secondary-content">
                                    <span className="mdl-list__item-secondary-info">{this.convertUnix(message.sentAt)}</span>
                                    <span className="mdl-list__item-secondary-action">
                                        {(this.props.activeUser === null) ? 
                                        '' : (this.props.activeUser.displayName === message.username) ? 
                                        <button 
                                            className="mdl-button mdl-js-button mdl-button--accent"
                                            value={message.key} onClick={(e) => this.deleteMessage(e)}>Delete</button> : ''}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    )}
                    {
                        (!this.props.activeRoom) ? 
                            <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                                <div className="mdl-card__title">
                                    <h2 className="mdl-card__title-text"></h2>
                                </div>
                                <div className="mdl-card__supporting-text">
                                    Welcome to Bloc Chat! To get started, select a chat room from the menu or create a new room.
                                </div>
                                <div className="mdl-card__actions mdl-card--border"></div>
                                <div className="mdl-card__menu">
                                </div>
                            </div>    
                    
                        : 
                        
                       <div className="footer">
                            <form onSubmit = { (e) => {this.createMessage(e)} }>
                                <div className="mdl-textfield mdl-js-textfield">
                                    <textarea
                                        className="mdl-textfield__input"
                                        type="text"
                                        placeholder="Write your message here..."
                                        rows= "3"
                                        value={this.state.newMessage}
                                        onChange={ (e) => this.handleChange(e) }
                                    ></textarea> 
                                    <input 
                                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                                        id="sendMessage"
                                        type="submit" 
                                        value="Send" 
                                    />
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default MessageList;