import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends React {
    constructor (props) {
        super(props);

        this.state = {
            activeRoom: this.props.activeroom
          };
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    render() {
        return(
            <div>
            </div>
        );
    }
}

export default MessageList;