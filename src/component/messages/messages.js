import React, { Component } from "react";

export default props => {
  return (
    <>
      <div className="all-messages"></div>
      <div className="send-message">
        <input type="text" placeholder="message here" id="message"></input>
        <div>submit</div>
      </div>
    </>
  );
};
