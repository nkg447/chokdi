import React, { Component } from "react";
import MyHand from "../myhand/myhand";
import OpponentHand from "../../component/oponenthand/opponenthand";

const suits = ["H", "S", "C", "D"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
export default class Game extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const gameRoomData = JSON.parse(this.props.gameRoomData);
    const username = this.props.username;
    const { cards, players, gameCode } = gameRoomData;
    const p1Cards = cards.splice(0, 13);
    const p2Cards = cards.splice(0, 13);
    const p3Cards = cards.splice(0, 13);
    const meCards = cards.splice(0, 13);

    if (Object.keys(players).length !== 4) {
      return <p>Waiting for other players, JOIN GAME {gameCode}</p>;
    }
    return (
      <div className="gameContainer">
        <div className="player1 player">
          <OpponentHand isVerticle={true} hand={p1Cards}></OpponentHand>
        </div>
        <div className="player2 player">
          <OpponentHand hand={p2Cards}></OpponentHand>
        </div>
        <div className="player3 player">
          <OpponentHand isVerticle={true} hand={p3Cards}></OpponentHand>
        </div>
        <div className="player4">
          <MyHand hand={meCards}></MyHand>
        </div>
        <div className="board"></div>
      </div>
    );
  }
}
