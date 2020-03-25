import React, { Component } from "react";

export default props => {
  const { suit, value } = props.card;
  return <img class="card" src={`cards/${value}${suit}.svg`}></img>;
};
