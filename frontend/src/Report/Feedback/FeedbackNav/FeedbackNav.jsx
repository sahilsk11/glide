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
      background: "linear-gradient(274.7deg, #FFF7E7 14.32%, #FFF9EC 97.17%)"
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