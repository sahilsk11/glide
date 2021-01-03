import React from "react";
import "./report-switcher.css";

export default function ReportSwitcher() {
  return (
    <div className="report-nav-container">
      <ReportNav title={"Prechecks"} />
      <ReportNav title={"Required Information"}/>
      <ReportNav title={"Experience Valuation"}/>
      <ReportNav title={"Miscellaneous Tips"} />
    </div>
  );
}

function ReportNav({title}) {
  return (
    <div className="report-nav">
      <p>{title}</p>
    </div>
  );
}