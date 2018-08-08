import React, { Component } from 'react';
    
class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
          };
      
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    createRoom(newRoomName) {
        this.roomsRef.push({
            name: newRoomName
        });
      }

    render() {
        return (
            this.state.rooms.map( room => 
                <tr>
                    <td>{room.name}</td>
                </tr>
            )
            (
                <form onSubmit={this.createRoom(this.newRoomName)}>
                    <label>
                        Room name:
                        <input type="submit" />
                    </label>
                </form>
            )
        );
    }
}

export default RoomList;