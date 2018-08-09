import React, { Component } from 'react';
    
class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName:''
          };
      
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    createRoom(e) {
        let newRoomName = this.state.newRoomName;
        e.preventDefault();
        this.roomsRef.push({
            name: newRoomName
        });
        this.setState({ newRoomName: ''})
      }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.state.rooms.map( (room, index) => 
                            <tr key={index}>
                                <td>{room.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <form onSubmit = { (e) => {this.createRoom(e)}}>
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