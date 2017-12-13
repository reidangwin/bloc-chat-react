import React, {Component} from 'react'

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: {}
        };

        this.defaultRoomId = 1;
        this.messagesRef = this.props.firebase.database().ref('messages')
    }

    setMessageState = () => {
        let room = parseInt(this.props.activeRoom.key || this.defaultRoomId, 10);
        this.messagesRef.orderByChild("roomId").equalTo(room).on("value", snapshot => {
            let response = snapshot.val() || [];
            let messages = Object.values(response);
            this.setState({messages});
            this.scrollToBottom();
        });
    }

    componentDidMount() {
        this.setMessageState();
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeRoom.key !== this.props.activeRoom.key || prevState.newMessage !== this.state.newMessage) {
            this.setMessageState();
        }
        this.scrollToBottom();
    }

    addMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            content: this.name.value,
            roomId: parseInt(this.props.activeRoom.key || this.defaultRoomId, 10),
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            username: this.props.userName,
        };

        this.setState({newMessage});
        this.messagesRef.push(newMessage);
        this.messageForm.reset();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div>
                <div id="room-name">
                    <h1>{this.props.activeRoom.name}</h1>
                </div>
                <section className="room-messages">
                    <table className='table table-striped'>
                        <tbody>
                        {
                            this.state.messages.map((message, idx) =>
                                <tr key={idx}>
                                    <td>
                                        <strong>{message.username}</strong><br/>
                                        {message.content}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                </section>
                <div className="new-message-container">
                    <form ref={(input) => this.messageForm = input} className="add-message"
                          onSubmit={(e) => this.addMessage(e)}>
                        <div className="input-group">
                            <input ref={(input) => this.name = input} className="form-control" type="text"
                                   placeholder="Type Message"/>
                            <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">+ Send</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default MessageList;