import React, { useState } from "react";
import Card from "../../component/card/card";
import socket from "../../socket";
const isEqual = require("lodash/isEqual");

export default props => {
  const { hand, isMyTurn, username } = props;
  const [cardSelected, setCardSelected] = useState(null);
  return (
    <div style={isMyTurn ? { marginTop: "20px" } : {}}>
      <div className="hand hhand-compact active-hand">
        {hand.map((card, key) => (
          <Card
            style={isEqual(card, cardSelected) ? { paddingBottom: "10px" } : {}}
            onClick={() => setCardSelected(card)}
            visible={true}
            key={key}
            card={card}
          ></Card>
        ))}
      </div>
      {isMyTurn ? (
        <div
          onClick={() => {
            socket.emit("dealt-card", { username, card: cardSelected });
          }}
          className="button"
        >
          PLAY THIS CARD
        </div>
      ) : null}
    </div>
  );
};
