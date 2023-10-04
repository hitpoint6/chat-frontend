import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import SidePanel from "./SidePanel";

const Chat = ({ socket }) => {
    const { roomId } = useParams();
    const username = localStorage.getItem("username");

    // Make sure refreshing the page doesn't break the app
    useEffect(() => {
        if (username === "" || roomId === "") {
            alert("Please enter a username and room");
        }
        socket.emit("join_room", { room: roomId, username: username });
    })

    return (
        <>
            <h1 className="text-2xl font-semibold mb-4 text-center">{roomId}</h1>

            <div className="flex h-96 gap-5">
                <div className="hidden sm:block flex-auto w-1/4">
                    <SidePanel socket={socket} username={username} room={roomId} />
                </div>
                <div className="flex-auto w-3/4">
                    <Messages
                        socket={socket}
                        username={username}
                        room={roomId}
                    />
                    <SendMessage socket={socket} username={username} room={roomId} />
                </div>
            </div >
        </>
    );
};

export default Chat;