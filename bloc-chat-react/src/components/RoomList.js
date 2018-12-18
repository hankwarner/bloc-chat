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
                    <table>
                        <span className="mdl-layout-title">Bloc Chat</span>
                        <tbody>
                            <span className="mdl-navigation">
                                {this.state.rooms.map( (room, index) => 
                                    <tr key={index} onClick={() => this.props.highlightRoom(room)}>
                                        <td className="mdl-navigation__link">{room.name}</td>
                                    </tr>
                                )}
                            </span>
                        </tbody>
                    </table>
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