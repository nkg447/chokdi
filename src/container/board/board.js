import React, { Component } from "react";
import Card from "../../component/card/card";

export default props => {
  const { username, cards } = props;
  return (
    <div>
      <div className="board-cards">
        {cards.map((card, key) => (
          <div>
            <Card
              key={key}
              visible={true}
              card={card.card}
              of={card.username}
            ></Card>
            <div>{card.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
