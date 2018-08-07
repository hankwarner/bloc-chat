import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'; 

https://www.gstatic.com/firebasejs/5.3.1/firebase.js

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
  }

  
  render() {
    return (
      <div>
       <RoomList />
      </div>
    );
  }
}

export default App;
