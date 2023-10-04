import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function SidePanel({ socket, username, room }) {
    const [roomUsers, setRoomUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        socket.on('chatroom_users', (data) => {
            console.log("users", data);
            setRoomUsers(data.map(user => user.username));
        })
    }, [socket]);


    function leaveRoom() {
        const timestamp = new Date();
        socket.emit('leave_room', { username, room, timestamp });
        navigate('/', { replace: true });
    }

    return (
        <>
            <div className="h-full border p-4 rounded-md overflow-auto">
                <h2 className="text-xl mb-3">Hey {username}</h2>
                <h2>Members:</h2>
                <ul>
                    {roomUsers.map((user, index) => {
                        return <li key={index}>{user}</li>;
                    })}
                </ul>
            </div>
            <div className="mt-3">
                <button className="custom_button_outline w-full" onClick={leaveRoom}>
                    <h2 >Back to all rooms</h2>
                </button>
            </div>
        </>
    );
}

export default SidePanel;