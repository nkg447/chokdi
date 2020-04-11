import React from "react";
import Card from "../../component/card/card";
import socket from "../../socket";
import { message } from "antd";
const indexOf = require("lodash/indexOf");

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
  "A",
];
function valueOf(value) {
  return indexOf(values, value);
}

function clickable(card, hand, board) {
  if (board.length === 0) return true;
  const baseSuit = board[0].card.suit;
  if (card.suit === baseSuit) return true;
  return hand.filter((c) => c.suit === baseSuit).length === 0;
}
let clickcount = 0;

export default (props) => {
  const { hand, isMyTurn, username, trump, currentBoard } = props;
  const currentClickCount = clickcount;
  return (
    <div style={isMyTurn ? { marginTop: "20px" } : {}}>
      <div className="hand hhand-compact active-hand">
        {hand
          .sort((c1, c2) => valueOf(c2.value) - valueOf(c1.value))
          .sort((c1, c2) => c1.suit.localeCompare(c2.suit))
          .map((card, key) => (
            <Card
              onClick={() => {
                if (
                  isMyTurn &&
                  currentClickCount == clickcount &&
                  clickable(card, hand, currentBoard)
                ) {
                  clickcount++;
                  socket.emit("dealt-card", { username, card });
                }
              }}
              visible={true}
              key={key}
              card={card}
            ></Card>
          ))}
      </div>
    </div>
  );
};
