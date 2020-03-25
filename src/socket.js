import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:4001");
export default socket;
