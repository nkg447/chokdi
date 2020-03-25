import React, { Component } from "react";
import "./App.css";
import Game from "./container/game/game";
import socket from "./socket";
import JoinOrCreate from "./component/join-create/joinorcreate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRoomData: undefined
    };
  }

  onCreate = username => {
    console.log("creae", username);

    socket.emit("create", { username });
    socket.on("created", data => {
      this.setState({ gameRoomData: data, username: username });
    });
  };

  onJoin = (gameCode, username) => {
    socket.emit("join", { gameCode, username });
    socket.on("joined", data => {
      this.setState({ gameRoomData: data, username });
    });
  };

  render = () => {
    const { gameRoomData } = this.state;
    return (
      <div className="App">
        {gameRoomData ? (
          <Game gameRoomData={gameRoomData}></Game>
        ) : (
          <JoinOrCreate
            onCreate={this.onCreate}
            onJoin={this.onJoin}
          ></JoinOrCreate>
        )}
      </div>
    );
  };
}

export default App;
