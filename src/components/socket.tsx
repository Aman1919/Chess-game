import { io } from "socket.io-client";

const socket = io('https://chess-game-server-production.up.railway.app/', {
        autoConnect: false,
        transports: ["websocket"]
});

export default socket;