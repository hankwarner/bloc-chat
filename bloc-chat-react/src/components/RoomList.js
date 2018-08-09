import React, { Component } from 'react';
    
class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName:""
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
        console.log(newRoomName);
        this.roomsRef.push({
            name: newRoomName
        });
      }

    render() {
        return (
            <div>
                {this.state.rooms.map( room => 
                    <tr>
                        <td>{room.name}</td>
                    </tr>
                )}
                <form>
                    <input 
                        type="text"
                    />
                    <button onClick = { (e) => {this.createRoom(e.target.value)}}>Submit</button>
                </form>
            </div>
        );
    }
}

export default RoomList;