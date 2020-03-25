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
      <div className="myhand">
        {hand.map(card=><Card card={card}></Card>)}
      </div>
    );
  }
}
