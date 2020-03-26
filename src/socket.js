import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://18.216.249.155:4001");
// const socket = socketIOClient("http://localhost:4001");
export default socket;
