import React, { Component } from "react";
import MyHand from "../myhand/myhand";

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
    const cards = [];
    values.forEach(v => {
      suits.forEach(s => cards.push({ suit: s, value: v }));
    });
    shuffle(cards);
    const p1Cards = cards.splice(0, 13);
    const p2Cards = cards.splice(0, 13);
    const p3Cards = cards.splice(0, 13);
    const meCards = cards.splice(0, 13);
    this.state = {
      p1Cards,
      p2Cards,
      p3Cards,
      meCards
    };
  }
  render() {
    const { meCards, p1Cards, p2Cards, p3Cards } = this.state;
    return (
      <div className="gameContainer">
        <div className="player1 player">PLAYER 1</div>
        <div className="player2 player">PLAYER 2</div>
        <div className="player3 player">PLAYER 3</div>
        <div className="player4">
          <MyHand hand={meCards}></MyHand>
        </div>
        <div className="board"></div>
      </div>
    );
  }
}
