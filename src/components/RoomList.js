import React, { Component } from 'react';
    
class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName:"",
          };
      
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        })

        this.roomsRef.on('child_removed', snapshot => {
            this.setState({ rooms: this.state.rooms.filter(room => room.key !== snapshot.key)})
        })
    }

    createRoom(e) {
        var newRoomName = prompt("New Room", "Enter Room Name");
        e.preventDefault();
        
        if(newRoomName) {
            this.roomsRef.push({
                name: newRoomName
            })
            this.setState({ newRoomName: ''})
        } else {
            return;
        }
    }

    deleteRoom(e) {
        let roomKey = e.target.value;
        e.preventDefault();
        this.roomRef.child(roomKey).remove();
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
    }

    promptUserLogin() {
        alert("Please login to create a new room.");
    }

    render() {
        const isNotLoggedIn = !this.props.activeUser;
        
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                <div className="mdl-layout__drawer">
                    
                    <span className="mdl-layout-title">Bloc Chat</span>

                    {isNotLoggedIn ?
                        <button 
                            onClick = { () => {this.promptUserLogin()}}
                            className="mdl-chip"
                            id="new-room">
                            <span className="mdl-chip__text">New Room</span>
                        </button>
                    :
                        <button 
                            onClick = { (e) => {this.createRoom(e)}}
                            className="mdl-chip"
                            id="new-room">
                            <span className="mdl-chip__text">New Room</span>
                        </button>
                    }

                    <span className="mdl-navigation">
                        {this.state.rooms.map( (room, index) => 
                            <span key={index}>
                                <span onClick={() => this.props.highlightRoom(room)} 
                                    className="mdl-navigation__link">
                                    {room.name}
                                </span>
                            </span>
                        )}
                    </span>
                </div>
            </div>
            );
    }
}

export default RoomList;