import React from "react";

export default props => {
  const { onCreate, onJoin } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <input id="my-username" placeholder="username" type="text"></input>
      <input
        id="game-code"
        placeholder="game code"
        value={localStorage.getItem("gameCode")}
        type="text"
      ></input>
      <div
        className="button"
        onClick={e =>
          onJoin(
            document.getElementById("game-code").value,
            document.getElementById("my-username").value
          )
        }
      >
        JOIN
      </div>
      <div
        className="button"
        onClick={e => onCreate(document.getElementById("my-username").value)}
      >
        CREATE NEW
      </div>
    </div>
  );
};
