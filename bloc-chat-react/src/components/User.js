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

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

    handleSignOut(user) {
        this.signOut();
        this.props.setUser(user);
    }
    
    render() {
        const isNotLoggedIn = this.props.activeUser === null;
        console.log(this.props.activeUser);

        return(
            <div>
                {isNotLoggedIn ? 
                    [
                        <button onClick={() => this.signIn()}>Sign In</button>, 
                        <span>Guest</span>] :
                    [
                        <button onClick={(user) => this.handleSignOut(user)}>Sign Out</button>,
                        <span>{this.props.activeUser.displayName}</span>
                    ]
                    }
            </div>
        );
    }
}

export default User;