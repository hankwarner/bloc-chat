import React, { Component } from 'react';

class User extends Component {

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
                        <button key="in" onClick={() => this.signIn()}>Sign In</button>, 
                        <span key="ind">Guest</span>] :
                    [
                        <button key="i" onClick={(user) => this.handleSignOut(user)}>Sign Out</button>,   
                        <span key="index">{this.props.activeUser.displayName}</span>
                    ]
                }
            </div>
        );
    }
}

export default User;