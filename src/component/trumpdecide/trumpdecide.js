import React, { useState } from "react";
import socket from "../../socket";
const suits = ["S", "H", "C", "D"];
export default props => {
  const { username } = props;
  const [trump, setTrump] = useState("S");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="trump-option">
        <div style={{ alignSelf: "center" }}>Decide Trump</div>
        {suits.map(s => (
          <img
            src={`cards/${s}.svg`}
            alt={`cards/${s}.svg`}
            style={trump === s ? { borderRadius: "30px", backgroundColor:"gray" } : {}}
            onClick={() => setTrump(s)}
          ></img>
        ))}
        <div
          style={{ alignSelf: "center" }}
          onClick={() => {
            socket.emit("trump-decide", { username, trump });
          }}
          className="button"
        >
          SUBMIT
        </div>
      </div>
    </div>
  );
};
