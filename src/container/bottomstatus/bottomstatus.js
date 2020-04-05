import React, { Component } from "react";
import Leaderboard from "../../component/leaderboard/leaderboard";
import Messages from "../../component/messages/messages";

export default props => {
  const { game, username } = props;
  const { message, players } = game;
  return (
    <div className="bottom-status-container">
      <div className="leaderboard">
        <Leaderboard players={players}></Leaderboard>
      </div>
      <div className="messages">
        <Messages username={username} game={game} message={message}></Messages>
      </div>
    </div>
  );
};
