import React from "react";
import "./report-switcher.css";

export default function ReportSwitcher({ activeFeedback, updateActiveFeedback }) {
  const tabs = [
    "ATS Scan",
    "Prechecks",
    "Required Info",
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
  if (activeFeedback === title) {
    containerActiveStyle = {
      backgroundColor: "rgba(241, 241, 244, 1)"
    }
  }
  let imgName = title.replace(" ", "-").toLowerCase();
  imgName += imgName === "helpful-tips" ? ".png" : ".svg";
  return (
    <div className="report-nav" style={containerActiveStyle} onClick={() => { updateActiveFeedback(title) }}>
      <img alt="" src={`./img/${imgName}`} className="report-nav-icon" />
      <p className="report-nav-label">{title}</p>
    </div>
  );
}