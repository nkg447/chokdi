import React, { useState } from "react";
import socket from "../../socket";
import Constants from "../../constants/constant";

export default props => {
  const { minHands, username } = props;

  const [hands, setHands] = useState(minHands);
  return (
    <>
      <div className="tell-hands">
        <p>{Constants.youTellHands()}</p>
        <div
          onClick={() => {
            if (hands > minHands) setHands(hands - 1);
          }}
          className="button"
        >
          -
        </div>
        <p>{hands}</p>
        <div
          onClick={() => {
            if (hands < 13) setHands(hands + 1);
          }}
          className="button"
        >
          +
        </div>
        <div
          onClick={() => {
            socket.emit("my-hand-count", { username, hands });
          }}
          className="button"
        >
          SUBMIT
        </div>
      </div>
    </>
  );
};
