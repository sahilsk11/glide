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

function LandingText() {
  return (
    <div className="landing-text-container">
      <h1 className="landing-text-title">Resume Feedback in One Click</h1>
      <p className="landing-subtext">
        You’ve spent weeks refining your resume, but still can’t land an interview. Glide helps you refine and catch mistakes using the same parsing API used by companies like Netflix and Twitch. Now you’ll land an interview at your dream company.
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
          <td className="prop-td"><Prop text="See how employers really see your resume" /></td>
          <td className="prop-td"><Prop text="Evaluate your experience and compare with other students" /></td>
        </tr>
        <tr>
          <td className="prop-td"><Prop text="Check for weak and strong verb usage" /></td>
          <td className="prop-td"><Prop text="Ensure dates are read correctly" /></td>
        </tr>
        <tr>
          <td className="prop-td"><Prop text="Ensure you have required information" /></td>
          <td className="prop-td"><Prop text="See how emploers really see your resume" /></td>
        </tr>
        <tr>
          <td className="prop-td"><Prop text="Confirm resume is scannable" /></td>
          <td className="prop-td"><Prop text="Quick tips for applying" /></td>
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