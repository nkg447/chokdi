import React, { useState } from "react";
import socket from "../../socket";
import Constants from "../../constants/constant";

export default (props) => {
  const { players, username } = props;

  return (
    <>
      <div className="choose-team">
        <p>Choose a teammate</p>
        <div>
          {Object.keys(players)
            .filter((player) => player !== username)
            .map((player, i) => (
              <div
                key={i}
                onClick={() => {
                  socket.emit("choose-team", { team: [username, player] });
                }}
                className="button"
              >
                {player}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
