import React from "react";
import Card from "../card/card";

export default props => {
  const { player, isVerticle, username } = props;
  const { cards, points, handsCountTold } = player;
  return (
    <div className={`hand ${isVerticle ? "v" : "h"}hand-compact active-hand`}>
      <h3>
        {username}(Points - {points.length})(hands - {handsCountTold})
      </h3>
      <div>
        {cards.map((card, key) => (
          <Card key={key} card={card}></Card>
        ))}
      </div>
    </div>
  );
};
