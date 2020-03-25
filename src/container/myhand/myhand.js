import React, { Component } from "react";
import Card from "../../component/card/card";

export default class MyHand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: props.hand
    };
  }
  render() {
    const { hand } = this.state;
    return (
      <div className="hand hhand-compact active-hand">
        <h3>YOU</h3>
        <div>
          {hand.map((card, key) => (
            <Card visible={true} key={key} card={card}></Card>
          ))}
        </div>
      </div>
    );
  }
}
