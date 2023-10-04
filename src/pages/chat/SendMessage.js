import { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
    const [newMessage, setNewMessage] = useState("");
    function sendMessage(e) {
        e.preventDefault();

        if (newMessage) {
            const data = {
                room: room,
                sender: username,
                message: newMessage,
                timestamp: new Date(),
            };
            socket.emit("send_message", data);
            setNewMessage("");
        }
    }

    return (
        <div className="mt-3">
            <form onSubmit={(e) => sendMessage(e)}>
                <div className="flex gap-5">
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message"
                        className="input_field"
                    />
                    <button className="custom_button">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage;
