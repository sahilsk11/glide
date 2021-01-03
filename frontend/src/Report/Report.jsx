import React from "react";
import "./report.css";

import CircleGraph from "./CircleGraph/CircleGraph";
import ReportNavigator from "./ReportNavigator/ReportNavigator"

export default function Report() {
  return (
    <div className="report-container">
      <ReportTitle />
      <Summary score={90} />
      <ReportNavigator />
      <EmailSignup />
    </div>
  );
}

function ReportTitle() {
  return (
    <>
      <h1 className="report-title">Resume Score</h1>
      <p className="report-subtitle">You're on your way to landing your dream job.</p>
    </>
  );
}

function Summary({ score }) {
  return (
    <div className="report-summary-container">
      <div className="report-graph-wrapper">
        <CircleGraph score={score} />
        <Label score={score} />
      </div>
      <div className="report-summary-text-container">
        <SummaryText />
      </div>
    </div>
  )
}

function Label({ score }) {
  let backgroundColor;
  let primaryColor;
  let text;
  if (score < 50) {
    backgroundColor = 'rgba(253, 239, 237, 1)';
    primaryColor = 'rgba(236, 92, 76, 1)';
    text = "Needs Improvement";
  } else if (score < 90) {
    backgroundColor = 'rgba(247, 232, 210, 1)';
    primaryColor = 'rgba(242, 167, 59, 1)';
    text = "On Track";
  } else {
    backgroundColor = 'rgba(218, 243, 223, 1)';
    primaryColor = 'rgba(94, 202, 117, 1)';
    text = "Looks Good";
  }
  return (
    <div className="report-label" style={{ backgroundColor }}>
      <p className="report-label-text" style={{ color: primaryColor }}>{text}</p>
    </div>
  )
}

function SummaryText() {
  return (
    <div>
      <h3>You’re on the right track to perfecting your resume...</h3>
      <hr />
      <h5>What employers see when you submit your resume:</h5>
      <p>Sameer Kapur's experience appears to be strongly concentrated in Information Technology (mostly Programming) and slightly concentrated in Marketing (mostly Digital). Sameer Kapur's experience appears to be lower-to-mid level, with about 5 years of experience, with 5 years of management experience, including a high-level position.</p>
    </div>
  )
}

function EmailSignup() {
  return (
    <div className="report-email-signup">
      <h2>There's a smarter way to apply.</h2>
      <p>We'll send you one resume tip per week. No B.S. Unsubscribe anytime.</p>
    </div>
  )
}