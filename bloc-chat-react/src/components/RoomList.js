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
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                <div className="mdl-layout__drawer">

                        <span className="mdl-layout-title">Bloc Chat</span>

                            <span className="mdl-navigation">
                                {this.state.rooms.map( (room, index) => 
                                    <span key={index} onClick={() => this.props.highlightRoom(room)}>
                                        <span className="mdl-navigation__link">{room.name}</span>
                                    </span>
                                )}
                            </span>


                    <form onSubmit = { (e) => {this.createRoom(e)}}>
                        <input 
                            type="text"
                            value={this.state.newRoomName}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input type="submit" value="New room" /> 
                    </form>
                </div>
            </div>
            );
    }
}

export default RoomList;