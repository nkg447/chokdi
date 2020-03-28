import React from "react";
import Card from "../../component/card/card";

export default props => {
  const { username, cards } = props;
  return (
    <div>
      <div className="board-cards">
        {cards.map((card, key) => (
          <div className="hand hhand-compact active-hand">
            <Card
              style={{ width: "20vh" }}
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
