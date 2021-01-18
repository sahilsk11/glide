import React from "react";
import "./error.css";

import Nav from "../Nav/Nav";

export default function Error() {
  return (
    <>
      <Nav />
      <div className="error-container">
        <div className="error-content">
          <img alt="" src="./img/yarn.svg" className="error-icon" />
          <h1 className="error-title">Aw, snap.</h1>
          <p className="error-subtitle">We ran into an error while processing your resume. Try again, or contact us by dropping feedback <a className="glide-link" href="https://airtable.com/shr2dgrLZTvXliBD6" target="_blank">here</a>.</p>
          <button onClick={() => {window.location.href="/"}} className="glide-btn error-back-btn">back</button>
        </div>
      </div>
    </>
  )
}