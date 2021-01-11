import React from "react";
import "./flag.css";

export default function Flag({ type, message }) {
  return (
    <>
      {type === "suggestion" ?
        Suggestion({ message }) :
        Warning({ message })
      }
    </>
  );
}

function Suggestion({ message }) {
  return (
    <div className="flag-suggestion">
      <img alt="" src="./img/lightbulb.png" className="flag-suggestion-icon" />
      <p className="suggestion-message">{message}</p>
    </div>
  )
}

function Warning({ message }) {
  return (
    <div className="flag-warning">
      <p >{message}</p>
    </div>
  )
}