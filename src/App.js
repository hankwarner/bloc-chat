import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'; 
import MessageList from './components/MessageList';
import User from './components/User';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyADnhsksV2J3_j6bKkx4Y2SaC9a_wmlIHo",
    authDomain: "bloc-chat-9698d.firebaseapp.com",
    databaseURL: "https://bloc-chat-9698d.firebaseio.com",
    projectId: "bloc-chat-9698d",
    storageBucket: "bloc-chat-9698d.appspot.com",
    messagingSenderId: "578062214112"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      activeUser: ''
    }

    this.highlightRoom = this.highlightRoom.bind(this);
  }

  highlightRoom(room) {
    this.setState({activeRoom: room})
  }

  setUser(user) {
    this.setState({activeUser: user})
  }
  
  render() {
    return (
      <div>
       <User
          firebase={firebase}
          activeUser={this.state.activeUser}
          setUser={(user) => this.setUser(user)}
       />

       <RoomList
          activeRoom={this.state.activeRoom}
          firebase={firebase}
          highlightRoom={(e) => this.highlightRoom(e)}
       />

       <MessageList
          activeRoom={this.state.activeRoom}
          firebase={firebase}
          highlightRoom={(e) => this.highlightRoom(e)}
          activeUser={this.state.activeUser}
       />
      </div>
    );
  }
}

export default App;
