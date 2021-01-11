import React from "react";
import "./report.css";

import CircleGraph from "./CircleGraph/CircleGraph";
import Feedback from "./Feedback/Feedback"

export default function Report({ pageData, redirect }) {
  if (!pageData.success) {
    redirect("error");
  }
  let summary = "We couldn't create a summary from this resume.";
  if (pageData.resumeJSON.summary) {
    summary = pageData.resumeJSON.summary.experience;
  }
  return (
    <div className="report-container">
      <ReportTitle />
      <Summary score={pageData.score} summaryText={summary} />
      <Feedback
        resumeImageSrc={pageData.resumeImageSrc}
        content={pageData}
        resumeAsJSON={pageData.resumeJSON}
        filename={pageData.filename}
      />
      {/* <EmailSignup /> */}
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

function Summary({ score, summaryText }) {
  return (
    <div className="report-summary-container">
      <div className="report-summary-content">
        <div className="report-graph-wrapper">
          <CircleGraph score={score} />
          <Label score={score} />
        </div>
        <div className="report-summary-text-container">
          <SummaryText text={summaryText} />
        </div>
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

function SummaryText({ text }) {
  return (
    <div>
      <h3 className="report-summary-title">You’re on the right track to perfecting your resume...</h3>
      <hr className="report-summary-hr" />
      <h5 className="report-summary-subtitle">What employers see when you submit your resume:</h5>
      <p className="report-summary-description">{text}</p>
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