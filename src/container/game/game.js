import React, { Component } from "react";
import MyHand from "../myhand/myhand";
import OpponentHand from "../../component/oponenthand/opponenthand";
import TellHands from "../../component/tellhands/tellhands";
import TrumpDecide from "../../component/trumpdecide/trumpdecide";
import Board from "../board/board";
import Constants from "../../constants/constant";
import BottomStatus from "../bottomstatus/bottomstatus";
import ChooseTeam from "../../component/chooseteam/chooseteam";

export default class Game extends Component {
  render() {
    const gameRoomData = JSON.parse(this.props.gameRoomData);
    console.log(gameRoomData);
    const username = this.props.username;
    let {
      players,
      gameCode,
      playersOrder,
      status,
      trump,
      message,
      teams,
    } = gameRoomData;

    let boardComponent = undefined;
    if (status === "WAITING_TO_JOIN") {
      playersOrder = [username];
      boardComponent = <div>{Constants.waitingToJoin(gameCode)}</div>;
    }
    if (status === "CHOOSE_TEAM") {
      if (username === playersOrder[0]) {
        boardComponent = (
          <ChooseTeam players={players} username={username}></ChooseTeam>
        );
      } else {
        boardComponent = <p>{Constants.chooseTeam(playersOrder[0])}</p>;
      }
    }
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
        boardComponent = <div>{Constants.gameStarted.yourMove()}</div>;
      } else {
        boardComponent = (
          <div>{Constants.gameStarted.waiting(gameRoomData.turnOf)}</div>
        );
      }
    }

    if (status === "GAME_OVER") {
      boardComponent = (
        <div>{Constants.gameOver(message.message)}</div>
      );
    }

    while (playersOrder[0] !== username) {
      playersOrder.push(playersOrder.shift());
    }
    return (
      <div className="gameContainer">
        {playersOrder
          .filter((p) => p !== username)
          .map((p, i) => {
            return (
              <div key={i} className={`player${i} player`}>
                <OpponentHand
                  isVerticle={i % 2 === 0}
                  player={players[p]}
                  teams={teams}
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
            player={players[username]}
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
        <div className="bottompane">
          <div className="status">
            {boardComponent}
            {gameRoomData.trump ? (
              <p>
                {Constants.trumpIs("")}
                <img
                  style={{ width: "30px" }}
                  src={`cards/${gameRoomData.trump}.svg`}
                  alt={`cards/${gameRoomData.trump}.svg`}
                ></img>
              </p>
            ) : null}
          </div>
          <div className="bottom-status">
            <BottomStatus
              username={username}
              game={gameRoomData}
            ></BottomStatus>
          </div>
        </div>
      </div>
    );
  }
}
