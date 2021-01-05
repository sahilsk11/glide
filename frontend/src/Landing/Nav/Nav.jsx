import React from "react";
import "./nav.css";

export default function Nav() {
  return (
    <div className="nav">
      <div className="nav-icon-wrapper">
        <Icon />
      </div>
      <div className="nav-email-signup-wrapper">
        <EmailSignup />
      </div>
    </div>
  );
}

function Icon() {
  return <>
    
  </>;
}

function EmailSignup() {
  return (
    <div>
      <form className="nav-form-container">
        <input
          className="nav-email-input"
          placeholder="Get one resume tip every week"
        />
        <button className="nav-email-btn">Get Resume Tips 🔑</button>
      </form>
    </div>
  )
}