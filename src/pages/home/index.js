
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();

    function joinRoom() {
        if (username === "" || room === "") {
            alert("Please enter a username and room");
            return;
        }
        socket.emit("join_room", { room: room, username: username });
        localStorage.setItem("username", username);
        navigate(`/chat/${room}`, { replace: true });
    }

    return (
        <>
            <section className="p-4 mx-auto w-1/2">
                <input
                    placeholder="username"
                    className="input_field my-3 py-3"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <select
                    className="input_field my-3 py-3"
                    onChange={(e) => setRoom(e.target.value)}
                    value={room}
                >
                    <option value=""></option>
                    <option value="Yosemite">Yosemite</option>
                    <option value="Yellowstone">Yellowstone</option>
                    <option value="Zion">Zion</option>
                </select>
                <button className="custom_button my-5" onClick={joinRoom}>
                    Join Room
                </button>
            </section>
        </>
    );
}

export default Home;