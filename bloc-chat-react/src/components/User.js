import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            console.log(user);
            this.props.setUser(user);
          });
    }

    render() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        const isNotLoggedIn = this.props.activeUser === null;
        const withPopup = this.props.firebase.auth().signInWithPopup(provider);
        const getOut = this.props.firebase.auth().signOut();

        if (isNotLoggedIn) {
            let button = <button onClick={() => this.withPopup}>Sign In</button>;
            <span>Guest</span>;
        } else {
            let button = <button onClick={() => this.getOut}>Sign Out</button>;
            <span>{this.props.activeUser.displayName}</span>;
        }

        return(
            <div>
                {this.button}
            </div>
        );
    }
}

export default User;