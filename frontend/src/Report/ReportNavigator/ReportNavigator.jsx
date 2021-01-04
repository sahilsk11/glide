import React, { useState } from "react";
import "./report-navigator.css";

import ReportSwitcher from "./ReportSwitcher/ReportSwitcher";

export default function ReportNavigator({ resumeImageSrc }) {
  const [activeFeedback, updateActiveFeedback] = useState("Prechecks");
  alert(resumeImageSrc)
  return (
    <div style={{ position: "relative" }}>
      <div className="report-navigator-container">
        <ReportSwitcher
          activeFeedback={activeFeedback}
          updateActiveFeedback={updateActiveFeedback}
        />
        <ReportContent activeFeedback={activeFeedback} />
      </div>
      <ResumeImage resumeImageSrc={resumeImageSrc} />
    </div>
  );
}

function ReportContent({ activeFeedback }) {
  const content = {
    "Prechecks": [
      "Great attention to naming!",
      "File format is perfect!",
      "Your Resume Scans!"
    ],
    "Required Information": [
      "Good job on including basic info",
      "Add a link to your LinkedIn profile"
    ],
    "Experience Valuation": [],
    "Miscellaneous Tips": []
  }
  console.log(activeFeedback);
  const feedbackList = content[activeFeedback];
  const feedbackComponent = feedbackList.map(text => <p>{text}</p>);
  return (
    <div className="report-content-container">
      <h2>{activeFeedback}</h2>
      <div>
        {feedbackComponent}
      </div>
    </div>
  );
}

function ResumeImage({ resumeImageSrc }) {
  return (
    <div className="report-resume-img-container">
      <img src={resumeImageSrc} className="report-resume-img" />
    </div>
  )
}