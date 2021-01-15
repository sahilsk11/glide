import React from "react";
import "./nav.css";

export default function Nav({ useYellowBackground }) {
  const style = useYellowBackground ? {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)"
  } : {};
  return (
    <div className="nav" style={style}>
      <div className="nav-icon-wrapper">
        <Icon />
      </div>
      <div className="nav-email-signup-wrapper">
        {/* <EmailSignup /> */}
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="nav-icon-container" onClick={() => window.location.href = "."}>
      <img alt="" src="./img/icon.svg" className="nav-icon" alt="" />
      <h1 className="nav-title">Glide</h1>
    </div>
  );
}

function EmailSignup() {
  function submit(event) {
    event.preventDefault();
  }
  return (
    <div>
      <form className="nav-form-container">
        <input
          className="nav-email-input"
          placeholder="Get one resume tip every week"
        />
        <button className="glide-btn nav-email-btn" onClick={submit}>Get Resume Tips 🔑</button>
      </form>
    </div>
  )
}