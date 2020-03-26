import React, { Component } from "react";
import MyHand from "../myhand/myhand";
import OpponentHand from "../../component/oponenthand/opponenthand";
import TellHands from "../../component/tellhands/tellhands";
import TrumpDecide from "../../component/trumpdecide/trumpdecide";

export default class Game extends Component {
  render() {
    const gameRoomData = JSON.parse(this.props.gameRoomData);
    const username = this.props.username;
    console.log(gameRoomData, username);
    const { players, gameCode, playersOrder, status, trump } = gameRoomData;

    if (status === "WAITING_TO_JOIN") {
      return <p>Waiting for other players, JOIN GAME {gameCode}</p>;
    }
    let boardComponent = undefined;
    if (status === "TELL_HANDS") {
      if (username === gameRoomData.tellHandsUsername) {
        boardComponent = (
          <TellHands
            username={username}
            minHands={gameRoomData.minHandsToTell}
          ></TellHands>
        );
      } else {
        boardComponent = (
          <p>Waiting for {gameRoomData.tellHandsUsername} to tell Hands</p>
        );
      }
    }
    if (status === "TRUMP_DECIDE") {
      if (username === gameRoomData.trumpTeller) {
        boardComponent = <TrumpDecide username={username}></TrumpDecide>;
      } else {
        boardComponent = (
          <p>
            Waiting for {gameRoomData.trumpTeller} to tell Trump.{" "}
            {gameRoomData.trumpTeller} will make {gameRoomData.minHandsToTell}{" "}
            hands
          </p>
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
          <h3>Trump - {trump}</h3>
        </div>
        <div className="board">{boardComponent}</div>
      </div>
    );
  }
}
