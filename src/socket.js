import socketIOClient from "socket.io-client";

let PORT = 4001;
let socketEndpoint = "";
if (
  window.location.href.indexOf("localhost") != -1 ||
  window.location.href.indexOf("127.0.0.1") != -1
)
  socketEndpoint = "localhost:" + PORT;
else if (window.location.href.indexOf("192.168") != -1)
  socketEndpoint = window.location.host + ":" + PORT;
else socketEndpoint = "http://18.216.249.155:" + PORT;

const socket = socketIOClient("http://192.168.0.115:4001");
export default socket;
