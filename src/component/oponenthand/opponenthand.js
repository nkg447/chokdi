import React from "react";
import Card from "../card/card";

export default (props) => {
  const { player, isVerticle, username, teams } = props;
  const { cards, points, handsCountTold, iconNumber } = player;

  const teamColor = teams
    ? teams.blue.filter((p) => p === username).length == 0
      ? "RED"
      : "BLUE"
    : "RED";

  return (
    <div>
      <div>
        <div className="text">
          <div className="icon">
            <img
              style={{
                margin: `-${parseInt(iconNumber / 4) * 50}px 0 0 -${
                  (iconNumber % 4) * 50
                }px`,
              }}
              src="/characters.jpg"
            ></img>
          </div>
          {username}(hands - {handsCountTold})
        </div>
        <div
          style={isVerticle ? {} : { marginTop: "-50px" }}
          className={`hand ${isVerticle ? "v" : "h"}hand-compact active-hand`}
        >
          {cards.map((card, key) => (
            <Card
              style={isVerticle ? {} : { marginLeft: "-5.5em" }}
              key={key}
              card={card}
              teamColor={teamColor}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
};
