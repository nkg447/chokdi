import React, { Component } from "react";

export default props => {
  const { players } = props;
  return (
    <table>
      <tr>
          <td>Username</td>
          <td>Points</td>
        </tr>
      {Object.keys(players).map((player, i) => (
        <tr>
          <td>{player}</td>
          <td>{players[player].points.length}</td>
        </tr>
      ))}
    </table>
  );
};
