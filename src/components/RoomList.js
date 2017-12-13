import React, {Component} from 'react'

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');

    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = {name: snapshot.val()};
            room.key = snapshot.key;
            this.setState({rooms: [...this.state.rooms, room]});
        });
    }


    addRoom = (e) => {
        e.preventDefault();
        const newRoom = {
            name: this.name.value,
            key: this.state.rooms.length + 1
        };

        this.roomsRef.child(newRoom.key).set(newRoom.name);

        // update our state
        const rooms = [...this.state.rooms, newRoom];

        // set state
        this.setState({rooms});
        this.roomForm.reset();
    }

    render() {
        return (
            <nav className="navbar-fixed-left" id="room-sidebar">
                <h1>Room List</h1>
                <div>
                    {this.state.rooms.map(room =>
                        <p className={this.props.activeRoom.key === room.key ? 'room active' : 'room'} key={room.key}
                           roomkey={room.key} roomname={room.name}
                           onClick={(e) => this.props.handleRoomChange(e)}>{room.name}</p>
                    )}
                    <form ref={(input) => this.roomForm = input} className="add-room" onSubmit={(e) => this.addRoom(e)}>
                        <div className="form-group">
                            <input className="form-control" ref={(input) => this.name = input} type="text"
                                   placeholder="Room Name"/>
                        </div>
                        <button className="btn btn-primary" type="submit">+ Add Room</button>
                    </form>

                </div>
            </nav>
        )
    }
}

export default RoomList;