import React from "react";

export default props => {
  const { card, visible } = props;
  const { suit, value } = card;
  if (visible) {
    return <img className="card" alt={`cards/${value}${suit}.svg`} src={`cards/${value}${suit}.svg`}></img>;
  }
  return <img className="card" src="cards/RED_BACK.svg" alt="cards/RED_BACK.svg"></img>;
};
