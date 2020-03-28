import React from "react";
import { setConstants } from "../../constants/constant";
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
        placeholder={
          localStorage.getItem("gameCode")
            ? localStorage.getItem("gameCode")
            : "game code"
        }
        type="text"
      ></input>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "40%"
        }}
      >
        <div
          className="button"
          onClick={e => {
            onJoin(
              document.getElementById("game-code").value === ""
                ? localStorage.getItem("gameCode")
                : document.getElementById("game-code").value,
              document.getElementById("my-username").value
            );
            setConstants(document.getElementById("lang").value);
          }}
        >
          JOIN
        </div>
        <div
          className="button"
          onClick={e => {
            onCreate(document.getElementById("my-username").value);
            setConstants(document.getElementById("lang").value);
          }}
        >
          CREATE NEW
        </div>
      </div>
      <select id="lang">
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="baburaw">Baburaw</option>
      </select>
    </div>
  );
};
