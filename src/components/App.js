import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../css/App.css';
import RoomList from './RoomList'
import MessageList from './MessageList'
import User from './User'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAZqC6tAoxKeqXGJJhRaP4aHF2wxDnmh8s",
    authDomain: "bloc-chat-react-6589a.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-6589a.firebaseio.com",
    projectId: "bloc-chat-react-6589a",
    storageBucket: "bloc-chat-react-6589a.appspot.com",
    messagingSenderId: "114669000580"
};

firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRoom: {
                key: 1,
                name: 'room1'
            },
            userName: 'Guest',
            userAuth: {},
        }
    }

    handleRoomChange = (e) => {
        let room = { key: e.target.getAttribute('roomKey'), name: e.target.getAttribute('roomName') }
        this.setState({ activeRoom: room});

    }

    setUser = (userAuth) => {
        let userName = userAuth? userAuth.displayName : 'Guest';
        this.setState({
            userAuth,
            userName
        });
        this.setState( {userName} );
    }


    render() {
        return (
            <div>
                <User firebase={firebase} setUser={this.setUser} userAuth={this.state.userAuth} userName={this.state.userName} />
                <RoomList firebase={firebase} handleRoomChange={this.handleRoomChange} handleMessageQuery={this.handleMessageQuery} activeRoom={this.state.activeRoom} />
                <MessageList firebase={firebase} activeRoom={this.state.activeRoom} userName={this.state.userName} />
            </div>
        );
    }
}

export default App;
