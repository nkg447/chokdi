import React from "react";

export default (props) => {
  const { card, visible, teamColor, of, ...otherProps } = props;
  const { suit, value } = card;
  let path = `cards/${teamColor}_BACK.svg`;
  if (visible) {
    path = `cards/${value}${suit}.svg`;
  }
  return <img {...otherProps} className="card" src={path} alt={path}></img>;
};
