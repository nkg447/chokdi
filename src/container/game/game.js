import React, { Component } from "react";
import MyHand from "../myhand/myhand";
import OpponentHand from "../../component/oponenthand/opponenthand";
import TellHands from "../../component/tellhands/tellhands";
export default class Game extends Component {
  render() {
    const gameRoomData = JSON.parse(this.props.gameRoomData);
    const username = this.props.username;
    console.log(gameRoomData, username);
    const { players, gameCode, playersOrder, status } = gameRoomData;

    if (status === "WAITING_TO_JOIN") {
      return <p>Waiting for other players, JOIN GAME {gameCode}</p>;
    }

    if (status === "TELL_HANDS") {
      if (username === gameRoomData.tellHandsUsername) {
        return (
          <TellHands
            username={username}
            minHands={gameRoomData.minHandsToTell}
          ></TellHands>
        );
      } else {
        return (
          <p>Waiting for {gameRoomData.tellHandsUsername} to tell Hands</p>
        );
      }
    }

    while (playersOrder[0] !== username) {
      playersOrder.push(playersOrder.shift());
    }
    return (
      <div className="gameContainer">
        {playersOrder
          .filter(p => p !== username)
          .map((p, i) => {
            return (
              <div key={i} className={`player${i} player`}>
                <OpponentHand
                  isVerticle={i % 2 === 0}
                  hand={players[p].cards}
                  username={p}
                ></OpponentHand>
              </div>
            );
          })}
        <div className="me">
          <MyHand hand={players[username].cards}></MyHand>
        </div>
        <div className="board"></div>
      </div>
    );
  }
}
