import { io } from "socket.io-client";

const socket = io('https://chess-game-server-xi.vercel.app/', {
        autoConnect: false
});

export default socket;