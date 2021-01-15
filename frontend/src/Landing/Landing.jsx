import React from "react";
import "./landing.css";

import Nav from "../Nav/Nav";
import FileDropzone from "./Dropzone/Dropzone";

export default function Landing({
  updateAppState,
  updateFilename,
  host,
  sharingOptIn,
  updateSharingOptIn
}) {
  return (
    <>
      <div className="landing-wrapper">
        <div className="landing-backdrop" />
        <img alt="" src="./img/wave.svg" className="landing-wave" />
        <Nav />
        <MadeForLabel />
        <LandingText />
        <div className="landing-dropzone-wrapper">
          {FileDropzone({ updateAppState, updateFilename, host, sharingOptIn, updateSharingOptIn })}
        </div>
      </div>
      <div className="landing-value-props-wrapper">
        <ValueProps />
      </div>
    </>
  );
}

function MadeForLabel() {
  return (
    <div className="swe-label">
      <p className="swe-label-text">MADE FOR SOFTWARE ENGINEERING INTERNS AND NEW GRADS</p>
    </div>
  );
}

function LandingText() {
  return (
    <div className="landing-text-container">
      <h1 className="landing-text-title">Detailed feedback to measure the<br />strength of your resume</h1>
      <p className="landing-subtext">
        Tired of not getting interviews? Glide takes the guesswork out of applying by demystifying application tracking systems (ATS). Identify where you stand, leverage feedback, and land more interviews.
      </p>
    </div>
  );
}

function ValueProps() {
  return (
    <div className="landing-value-props-container">
      <h1 className="landing-props-title">Things you can do with Glide ✨</h1>
      <table className="prop-table">
        <tr>
          <td className="prop-td"><Prop text="Get actionable feedback on your resume" /></td>
          <td className="prop-td"><Prop text="Ensure your resume scans and is ATS compliant" /></td>
        </tr>
        <tr>
          <td className="prop-td"><Prop text="Diagnose weakpoints in your resume" /></td>
          <td className="prop-td"><Prop text="Unlimited scans. 100% free. No strings attached." /></td>
        </tr>
        <tr>
          <td className="prop-td"><Prop text="Identify pivotal missing information" /></td>
          <td className="prop-td"><Prop text="Keyword analysis tailored for SWE roles" /></td>
        </tr>
        <tr>
          <td className="prop-td"><Prop text="Get noticed by automated recruiting systems" /></td>
          <td className="prop-td"><Prop text="Secure the bag 💰" /></td>
        </tr>
      </table>
    </div>
  )
}

function Prop({ text }) {
  return (
    <div className="landing-props-container">
      <img alt="" src="./img/prop-check.png" className="prop-check" />
      <p className="prop-text">{text}</p>
    </div>
  )
}