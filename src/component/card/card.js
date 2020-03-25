import React, { Component } from "react";

export default props => {
  const { suit, value } = props.card;
  return (
    <div className="card">
      <h2>{suit}</h2>
      <h3>{value}</h3>
    </div>
  );
};
