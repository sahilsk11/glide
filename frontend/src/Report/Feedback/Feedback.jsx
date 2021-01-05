import React, { useState } from "react";
import "./feedback.css";
import copy from "./copy";

import ReportSwitcher from "./FeedbackNav/FeedbackNav";
import ParseTable from "./ParseTable/ParseTable";

export default function ReportNavigator({ resumeImageSrc, content, resumeAsJSON }) {
  const [activeFeedback, updateActiveFeedback] = useState("Prechecks");
  return (
    <div style={{ position: "relative" }}>
      <div className="report-navigator-container">
        <ReportSwitcher
          activeFeedback={activeFeedback}
          updateActiveFeedback={updateActiveFeedback}
        />
        <ReportContent
          activeFeedback={activeFeedback}
          activeContent={content[activeFeedback]}
          resumeAsJSON={resumeAsJSON}
        />
      </div>
      <ResumeImage resumeImageSrc={resumeImageSrc} />
    </div>
  );
}

function ReportContent({ activeFeedback, activeContent, resumeAsJSON }) {
  let feedbackComponent;
  if (activeFeedback == "Prechecks") {
    feedbackComponent = Prechecks({ activeContent });
  } else if (activeFeedback == "Required Information") {
    feedbackComponent = RequiredInfo({ activeContent });
  } else if (activeFeedback == "Formatting") {
    feedbackComponent = ParseTable({ resumeAsJSON });
  }
  return (
    <div className="report-content-container">
      <h2 className="feedback-active-title">{activeFeedback}</h2>
      <div>
        {feedbackComponent}
      </div>
    </div>
  );
}

function Prechecks({ activeContent }) {
  const options = copy["Prechecks"];
  const componentNames = ["isFilePDF", "isFileScannable", "doesFollowNaming"]
  let components = [];
  componentNames.forEach(key => {
    const checked = activeContent[key];
    console.log(checked);
    components.push(
      <FeedbackComponent
        checked={checked}
        title={options[key][checked.toString()]["title"]}
        subtitle={options[key][checked.toString()]["subtitle"]}
      />
    );
  });
  console.log(components);
  return (
    <div>
      {components}
    </div>
  )
}

function RequiredInfo({ activeContent }) {
  const options = copy["Required Information"];
  const componentNames = ["degree", "emails", "endMonth", "endYear", "gpa", "linkedin", "name", "phoneNumber", "startMonth", "startYear"];
  let components = [];
  componentNames.forEach(key => {
    const checked = activeContent[key];
    console.log(checked);
    components.push(
      <FeedbackComponent
        checked={checked}
        title={options[key][checked.toString()]["title"]}
        subtitle={options[key][checked.toString()]["subtitle"]}
      />
    );
  });
  console.log(components);
  return (
    <div>
      {components}
    </div>
  )
}

function FeedbackComponent({ checked, title, subtitle }) {
  let img;
  if (checked) {
    img = <img src="./img/check.png" className="feedback-component-check" />
  } else {
    img = <img src="./img/dot.png" className="feedback-component-check" />
  }
  return (
    <div className="feedback-component-container">
      {img}
      <p className="feedback-component-title">{title}</p>
      <p className="feedback-component-subtitle">{subtitle}</p>
    </div>
  )
}

function ResumeImage({ resumeImageSrc }) {
  return (
    <div className="report-resume-img-container">
      <img src={resumeImageSrc} className="report-resume-img" />
    </div>
  )
}