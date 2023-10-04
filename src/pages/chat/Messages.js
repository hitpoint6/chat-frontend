
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket, username, room }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);
    const endOfMessagesRef = useRef(null);

    async function loadSavedMessages() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/messages/${room}`);

        if (!res.ok) {
            console.error("Fetch error:", res.statusText);
            return;
        }
        const data = await res.json();
        const formattedMessages = data.map((newMessage) => {
            return {
                ...newMessage,
                id: newMessage._id,
            };
        });

        setMessagesReceived(formattedMessages);
    }

    useEffect(() => {
        loadSavedMessages();
    }, []);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessagesReceived((messages) => [...messages, data]);
        });

        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);

    function convertTimestamp(timestamp) {
        if (!timestamp) {
            return "";
        }

        timestamp = new Date(timestamp);
        return timestamp.toLocaleString(undefined, {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function messageAlign(sender) {
        if (sender === username) {
            return "ml-auto";
        } else {
            return "";
        }
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messagesReceived]);


    return (
        <div className="h-full border p-4 rounded-md overflow-auto">
            {messagesReceived.map((message, index) => (
                <div className="flex my-3" key={message.id}>
                    <div
                        key={index}
                        className={`mb-2 w-3/4 ${messageAlign(message.sender)}`}
                    >
                        <div className="flex">
                            <div
                                className={`flex gap-3 text-xs ${messageAlign(
                                    message.sender
                                )}`}
                            >
                                <p className="text-md">{message.sender}</p>
                                <p>{convertTimestamp(message.timestamp)}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className={`${messageAlign(message.sender)}`}>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div ref={endOfMessagesRef} />
        </div>

    );

}

export default Messages;
