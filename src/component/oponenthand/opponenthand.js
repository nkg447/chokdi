import React, { Component } from "react";
import Card from "../card/card";

export default props => {
  const { hand, isVerticle } = props;
  return (
    <div className={`hand ${isVerticle ? "v" : "h"}hand-compact active-hand`}>
      {hand.map((card, key) => (
          <Card key={key} card={card}></Card>
        ))}
    </div>
  );
};
