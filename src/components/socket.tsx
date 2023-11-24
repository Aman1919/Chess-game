import { io } from "socket.io-client";

const socket = io('http://localhost:1000/', {
        autoConnect: false
});

export default socket;