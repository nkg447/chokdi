import React, { Component } from "react";
import MyHand from "../myhand/myhand";
import OpponentHand from "../../component/oponenthand/opponenthand";

export default class Game extends Component {
  render() {
    const gameRoomData = JSON.parse(this.props.gameRoomData);
    const username = this.props.username;
    console.log(gameRoomData, username);
    const { players, gameCode } = gameRoomData;

    if (Object.keys(players).length !== 4) {
      return <p>Waiting for other players, JOIN GAME {gameCode}</p>;
    }
    return (
      <div className="gameContainer">
        {Object.keys(players)
          .filter(p => p !== username)
          .map((p, i) => {
            return (
              <div key={i} className={`player${i} player`}>
                <OpponentHand
                  isVerticle={i % 2 === 0}
                  hand={players[p].cards}
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
