import React from "react";
import { setConstants } from "../../constants/constant";
export default (props) => {
  const { onCreate, onJoin, rooms } = props;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            width: "40%",
          }}
        >
          <div
            className="button"
            onClick={(e) => {
              if (document.getElementById("my-username").value.trim() !== "")
                onJoin(
                  document.getElementById("game-code").value === ""
                    ? localStorage.getItem("gameCode")
                    : document.getElementById("game-code").value.trim(),
                  document.getElementById("my-username").value.trim()
                );
              setConstants(document.getElementById("lang").value);
            }}
          >
            JOIN
          </div>
          <div
            className="button"
            onClick={(e) => {
              onCreate(document.getElementById("my-username").value.trim());
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
      <div className="rooms">
        {rooms.map((room, i) => (
          <div className="room" key={i}>
            <h3>GameRoom - {room.key}</h3>
            <ul>
              {room.players.map((player, i1) => (
                <li key={i1}>{player}</li>
              ))}
            </ul>
            <div
              className="button"
              onClick={(e) => {
                if (document.getElementById("my-username").value.trim() !== "")
                  onJoin(
                    room.key,
                    document.getElementById("my-username").value.trim()
                  );
                setConstants(document.getElementById("lang").value);
              }}
            >
              JOIN
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
