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
          <div
            style={trump === s ? { backgroundColor: "blue" } : {}}
            onClick={() => setTrump(s)}
          >
            {s}
          </div>
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
