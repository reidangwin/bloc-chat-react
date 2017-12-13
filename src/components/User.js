import React, {Component} from 'react'

class User extends Component {
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    handleSignIn = () => {
        this.provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.setUser(this.props.firebase.auth().signInWithPopup(this.provider));
    }

    handleSignOut = () => {
        this.props.firebase.auth().signOut();
        this.props.setUser(null);
    }

    render() {
        return (
            <nav className="navbar-fixed-top" id="auth-container">
                <p><sp className="user-greeting">Hello {this.props.userName}</sp>
                    <button className="btn btn-primary" onClick={() => {
                        !this.props.userAuth ? this.handleSignIn() : this.handleSignOut()
                    }}> Sign {!this.props.userAuth ? 'In' : 'Out'} </button>
                </p>
            </nav>
        )
    }
}

export default User;