import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
          });
    }

    render() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        const isNotLoggedIn = this.props.activeUser === null;
        const withPopup = this.props.firebase.auth().signInWithPopup(provider);
        const getOut = this.props.firebase.auth().signOut();

        return(
            <div>
                <span>{isNotLoggedIn ? 
                        <button onClick={() => this.withPopup}>Sign In</button> : 
                        <button onClick={() => this.getOut}>Sign Out</button>
                        }</span>
            </div>
        );
    }
}

export default User;