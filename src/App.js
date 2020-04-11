import React, { Component } from "react";
import "./App.css";
import Game from "./container/game/game";
import socket from "./socket";
import JoinOrCreate from "./component/join-create/joinorcreate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRoomData: undefined,
      username: undefined,
      rooms: [],
    };

    socket.on("update", (data) => {
      this.setState({
        gameRoomData: JSON.stringify(data),
      });
    });
    socket.on("rooms", (data) => {
      console.log(data);
      
      this.setState({ rooms: data });
    });
  }

  onCreate = (username) => {
    socket.emit("create", { username });
    socket.on("created", (data) => {
      localStorage.setItem("gameCode", data.gameCode);
      this.setState({
        gameRoomData: JSON.stringify(data),
        username: username,
      });
    });
    socket.on("joined", (data) => {
      this.setState({ gameRoomData: JSON.stringify(data) });
    });
  };

  onJoin = (gameCode, username) => {
    socket.emit("join", { gameCode, username });
    socket.on("joined", (data) => {
      this.setState({ gameRoomData: JSON.stringify(data), username });
    });
  };

  render = () => {
    const { gameRoomData, username, rooms } = this.state;
    return (
      <div className="App">
        {gameRoomData ? (
          <Game gameRoomData={gameRoomData} username={username}></Game>
        ) : (
          <JoinOrCreate
            rooms={rooms}
            onCreate={this.onCreate}
            onJoin={this.onJoin}
          ></JoinOrCreate>
        )}
      </div>
    );
  };
}

export default App;
