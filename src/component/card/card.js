import React from "react";

export default props => {
  const { card, visible, of, ...otherProps } = props;
  const { suit, value } = card;
  let path = "cards/RED_BACK.svg";
  if (visible) {
    path = `cards/${value}${suit}.svg`;
  }
  return <img {...otherProps} className="card" src={path} alt={path}></img>;
};
