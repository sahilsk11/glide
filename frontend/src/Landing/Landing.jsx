import React from "react";
import "./landing.css";

import Nav from "./Nav/Nav";
import FileDropzone from "./Dropzone/Dropzone";

export default function Landing({
  updateAppState,
  updateFilename,
  isDev,
  sharingOptIn,
  updateSharingOptIn
}) {
  return (
    <>
      <Nav />
      <LandingText />
      <div className="landing-dropzone-wrapper">
        {FileDropzone({ updateAppState, updateFilename, isDev })}
      </div>
      <OptIn sharingOptIn={sharingOptIn} updateSharingOptIn={updateSharingOptIn} />
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
        You spent weeks refining your resume, but still can’t land an interview. Omni helps you refine and catch mistakes using pro algos. Now you’ll land an interview at your dream company.
      </p>
    </div>
  );
}

function ValueProps() {
  return (
    <div className="landing-value-props-container">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
    </div>
  )
}

function OptIn({ sharingOptIn, updateSharingOptIn }) {
  return (
    <div className="landing-opt-in-container">
      <input
        type="checkbox"
        className="landing-opt-in-checkbox"
        checked={sharingOptIn}
        onClick={() => {
          updateSharingOptIn(!sharingOptIn)
        }}
      />
      <label>Share my resume with recruiters & the Glide team (<a>privacy policy</a>)</label>
    </div>
  )
}