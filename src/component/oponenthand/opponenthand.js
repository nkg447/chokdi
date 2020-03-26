import React from "react";
import Card from "../card/card";

export default props => {
  const { hand, isVerticle, username, points } = props;
  return (
    <div className={`hand ${isVerticle ? "v" : "h"}hand-compact active-hand`}>
      <h3>{username}(Points - {points.length})</h3>
      <div>
        {hand.map((card, key) => (
          <Card key={key} card={card}></Card>
        ))}
      </div>
    </div>
  );
};
