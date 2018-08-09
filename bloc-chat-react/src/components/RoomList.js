import React, { Component } from 'react';
import * as firebase from 'firebase';
    
class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName:"",
            activeRoom: this.props.activeroom
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

    handleChange(e) {
        this.setState({ newRoomName: e.target.value})
    }

    highlightRoom(e) {
        this.setState({activeroom: e.target.value})
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.state.rooms.map( (room, index) => 
                            <tr key={index} onClick={(e) => this.highlightRoom(e)}>
                                <td>{room.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <form onSubmit = { () => {this.createRoom(this.state.newRoomName)}}>
                    <input 
                        type="text"
                        value={this.state.newRoomName}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input type="submit" /> 
                </form>
            </div>
            );
    }
}

export default RoomList;