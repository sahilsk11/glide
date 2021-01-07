import React from "react";
import "./report-switcher.css";

export default function ReportSwitcher({ activeFeedback, updateActiveFeedback }) {
  const tabs = [
    "ATS Scan",
    "Prechecks",
    "Required Information",
    "Experience",
    "Helpful Tips"
  ];
  const tabComponents = tabs.map(tabName => (
    <ReportNav title={tabName}
      activeFeedback={activeFeedback}
      updateActiveFeedback={updateActiveFeedback}
    />
  ));
  return (
    <div className="report-nav-container">
      {tabComponents}
    </div>
  );
}

function ReportNav({ title, activeFeedback, updateActiveFeedback }) {
  let containerActiveStyle = {};
  let textActiveStyle = {};
  if (activeFeedback == title) {
    containerActiveStyle = {
      backgroundColor: "rgba(241, 241, 244, 1)"
    }
    textActiveStyle = {
      
    }
  }
  const imgName = title.replace(" ", "-").toLowerCase();
  return (
    <div className="report-nav" style={containerActiveStyle} onClick={() => { updateActiveFeedback(title) }}>
      <img src={`./img/${imgName}.svg`} className="report-nav-icon" />
      <p style={{textActiveStyle}} className="report-nav-label">{title}</p>
    </div>
  );
}