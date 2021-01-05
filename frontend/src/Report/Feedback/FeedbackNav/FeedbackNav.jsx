import React from "react";
import "./report-switcher.css";

export default function ReportSwitcher({ activeFeedback, updateActiveFeedback }) {
  return (
    <div className="report-nav-container">
      <ReportNav title={"Prechecks"}
        activeFeedback={activeFeedback}
        updateActiveFeedback={updateActiveFeedback}
      />
      <ReportNav title={"Required Information"}
        activeFeedback={activeFeedback}
        updateActiveFeedback={updateActiveFeedback}
      />
      <ReportNav title={"Experience Valuation"}
        activeFeedback={activeFeedback}
        updateActiveFeedback={updateActiveFeedback}
      />
      <ReportNav title={"Miscellaneous Tips"}
        activeFeedback={activeFeedback}
        updateActiveFeedback={updateActiveFeedback}
      />
      <ReportNav title={"Formatting"}
        activeFeedback={activeFeedback}
        updateActiveFeedback={updateActiveFeedback}
      />
    </div>
  );
}

function ReportNav({ title, activeFeedback, updateActiveFeedback }) {
  let activeStyle = {};
  if (activeFeedback == title) {
    activeStyle = {
      backgroundColor: "rgba(241, 241, 244, 1)"
    }
  }
  const imgName = title.replace(" ", "-").toLowerCase();
  return (
    <div className="report-nav" style={activeStyle} onClick={() => { updateActiveFeedback(title) }}>
      <img src={`./img/${imgName}.svg`} className="report-nav-icon" />
      <p className="report-nav-label">{title}</p>
    </div>
  );
}