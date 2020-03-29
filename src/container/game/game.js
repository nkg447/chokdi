import React, { Component } from "react";
import MyHand from "../myhand/myhand";
import OpponentHand from "../../component/oponenthand/opponenthand";
import TellHands from "../../component/tellhands/tellhands";
import TrumpDecide from "../../component/trumpdecide/trumpdecide";
import Board from "../board/board";
import Constants from "../../constants/constant";

export default class Game extends Component {
  render() {
    const gameRoomData = JSON.parse(this.props.gameRoomData);
    const username = this.props.username;
    const { players, gameCode, playersOrder, status, trump } = gameRoomData;

    if (status === "WAITING_TO_JOIN") {
      return <p>{Constants.waitingToJoin(gameCode)}</p>;
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
          <p>{Constants.tellHands(gameRoomData.tellHandsUsername)}</p>
        );
      }
    }
    if (status === "TRUMP_DECIDE") {
      if (username === gameRoomData.trumpTeller) {
        boardComponent = <TrumpDecide username={username}></TrumpDecide>;
      } else {
        boardComponent = (
          <p>
            {Constants.trumpDecide(
              gameRoomData.trumpTeller,
              gameRoomData.minHandsToTell
            )}
          </p>
        );
      }
    }
    if (status === "GAME_STARTED") {
      if (username === gameRoomData.turnOf) {
        boardComponent = (
          <div>
            <div>{Constants.gameStarted.yourMove()}</div>
            <div>
              {Constants.gameStarted.lastRoundWinner(
                gameRoomData.lastRoundWinner
              )}
            </div>
          </div>
        );
      } else {
        boardComponent = (
          <div>
            <div>{Constants.gameStarted.waiting(gameRoomData.turnOf)}</div>
            <div>
              {Constants.gameStarted.lastRoundWinner(
                gameRoomData.lastRoundWinner
              )}
            </div>
          </div>
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
                  player={players[p]}
                  username={p}
                ></OpponentHand>
              </div>
            );
          })}
        <div className="me">
          <MyHand
            trump={trump}
            username={username}
            isMyTurn={username === gameRoomData.turnOf}
            hand={players[username].cards}
            currentBoard={gameRoomData.currentBoard}
          ></MyHand>
          <h3>
            {Constants.myHandSubtitle(
              username,
              players[username].points.length,
              trump
            )}
          </h3>
        </div>
        <div className="board">
          {status === "GAME_STARTED" ? (
            <Board
              username={username}
              cards={gameRoomData.currentBoard}
            ></Board>
          ) : null}
        </div>
        <div className="scoreboard">{boardComponent}</div>
      </div>
    );
  }
}
