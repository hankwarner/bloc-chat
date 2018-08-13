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

        return(
            <div>
                {this.props.activeUser == null ?
                    (<button onClick={() => this.withPopup}>Sign In</button>)
                    (<span>Guest</span>) :
                    (<button onClick={() => this.getOut}>Sign Out</button>)
                    (<span>{this.props.activeUser.displayName}</span>)}
            </div>
        );
    }
}

export default User;