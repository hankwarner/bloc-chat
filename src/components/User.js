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
        const isNotLoggedIn = !this.props.activeUser;
        console.log(this.props.activeUser);

        return(
            <div className="signinout">
                {isNotLoggedIn ? 
                    [
                        <button 
                            className="mdl-chip"
                            key="in" 
                            onClick={() => this.signIn()}>
                            <span className="mdl-chip__text">Sign In</span>
                        </button>, 
                        <span className="username" key="ind">Guest</span>] :
                    [
                        <button 
                            className="mdl-chip"
                            key="i" 
                            onClick={(user) => this.handleSignOut(user)}>
                            <span className="mdl-chip__text">Sign Out</span>
                        </button>, 
                        <span className="username" key="index">{this.props.activeUser.displayName}</span>
                    ]
                }
            </div>
        );
    }
}

export default User;