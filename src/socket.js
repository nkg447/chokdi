import socketIOClient from "socket.io-client";

// const socket = socketIOClient("https://18.216.249.155:4001");
const socket = socketIOClient("https://8a5ee01b.ngrok.io");
// const socket = socketIOClient("http://localhost:4001");
export default socket;
