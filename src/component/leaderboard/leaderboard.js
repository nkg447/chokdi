import React, { Component } from "react";

export default (props) => {
  const { players } = props;
  const teams = props.teams || [];
  console.log(
    Object.keys(teams).map((team) =>
      teams[team]
        .map((player) => players[player].points.length)
        .reduce((a, b) => a + b, 0)
    )
  );

  return (
    <table>
      <tr>
        <td>Team</td>
        <td>Points</td>
      </tr>
      {Object.keys(teams).map((team, i) => (
        <tr>
          <td>{team}</td>
          <td>
            {teams[team]
              .map((player) => players[player].points.length)
              .reduce((a, b) => a + b, 0)}
          </td>
        </tr>
      ))}
    </table>
  );
};
