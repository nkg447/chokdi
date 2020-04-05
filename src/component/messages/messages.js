import React, { useState, useEffect } from "react";
import Constants from "../../constants/constant";
import socket from "../../socket";
const isEqual = require("lodash/isEqual");

function getMessage(game, message) {
  const msg = message.message;
  if (message.type === "TELL_HANDS") {
    return Constants.tellHands(msg);
  } else if (message.type === "DECIDE_TRUMP") {
    return Constants.trumpDecide(msg, game.minHandsToTell);
  } else if (message.type === "TRUMP_DECIDE") {
    return Constants.trumpIs(msg);
  } else if (message.type === "LAST_ROUND_WINNER") {
    return Constants.gameStarted.lastRoundWinner(msg);
  } else if (message.type === "TURN_OF") {
    return Constants.gameStarted.waiting(msg);
  } else if (message.type === "JOINED") {
    return Constants.joined(msg);
  } else if (message.type === "CREATED") {
    return `Game Room created with secret code ${msg}`;
  }
}

export default props => {
  const { message, game, username } = props;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isEqual(messages[messages.length - 1], message))
      setMessages(messages => [...messages, message]);
    setTimeout(() => {
      const allMessagesTag = document.getElementsByClassName("all-messages");
      if (allMessagesTag.length !== 0) {
        allMessagesTag[0].scrollTop =
          allMessagesTag[0].scrollTop + allMessagesTag[0].clientHeight;
        console.log(
          allMessagesTag[0].scrollTop,
          allMessagesTag[0].scrollHeight
        );
      }
    }, 100);
  }, [message]);

  return (
    <>
      <div className="all-messages">
        {messages.map((message, i) => (
          <p key={i}>
            {message.type
              ? "server: " + getMessage(game, message)
              : `${message.username}: ${message.message}`}
          </p>
        ))}
      </div>
      <div className="send-message">
        <input
          onKeyUp={e => {
            if (e.keyCode === 13) {
              socket.emit("message", {
                username,
                message: document.getElementById("message").value
              });
              document.getElementById("message").value = "";
            }
          }}
          type="text"
          placeholder="message here"
          id="message"
        ></input>
      </div>
    </>
  );
};
