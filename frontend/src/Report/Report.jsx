import React from "react";
import "./report.css";

import CircleGraph from "./CircleGraph/CircleGraph";

export default function Report() {
  return (
    <div className="report-container">
      <ReportTitle />
      <Summary />
    </div>
  );
}

function ReportTitle() {
  return (
    <div className="report-title-container">
      <h1 className="report-title">Resume Score</h1>
      <p className="report-subtitle">You're on your way to landing your dream job.</p>
    </div>
  )
}

function Summary() {
  return (
    <div className="report-summary-container">
      <div className="report-graph-wrapper">
        <CircleGraph score={40} />
        <Label />
      </div>
      <div className="report-summary-text-container">
        <SummaryText />
      </div>
    </div>
  )
}

function Label(score) {
  return (
    <div className="report-label">
      <p className="report-label-text">On Track</p>
    </div>
  )
}

function SummaryText() {
  return (
    <div>
      <h3>You’re on the right track to perfecting your resume...</h3>
      <h5>What employers see when you submit your resume:</h5>
      <p>Sameer Kapur's experience appears to be strongly concentrated in Information Technology (mostly Programming) and slightly concentrated in Marketing (mostly Digital). Sameer Kapur's experience appears to be lower-to-mid level, with about 5 years of experience, with 5 years of management experience, including a high-level position.</p>
    </div>
  )
}