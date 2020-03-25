import React from "react";

export default props => {
  const { onCreate, onJoin } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
      }}
    >
      <input id="my-username" placeholder="username" type="text"></input>
      <input id="game-code" placeholder="game code" type="text"></input>
      <button
        onClick={e =>
          onJoin(
            document.getElementById("game-code").value,
            document.getElementById("my-username").value
          )
        }
      >
        JOIN
      </button>
      <button
        onClick={e => onCreate(document.getElementById("my-username").value)}
      >
        CREATE NEW
      </button>
    </div>
  );
};
