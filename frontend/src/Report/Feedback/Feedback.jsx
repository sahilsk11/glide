import React, { useState } from "react";
import "./feedback.css";
import copy from "./copy";

import ReportSwitcher from "./FeedbackNav/FeedbackNav";
import Experience from "./Experience/Experience";
import ParseTable from "./ParseTable/ParseTable";

export default function Feedback({ resumeImageSrc, content, resumeAsJSON, filename, experienceVisible, updateExperienceVisibility }) {
  const [activeFeedback, updateActiveFeedback] = useState("Experience");

  return (
    <div style={{ position: "relative", width: "85%", margin: "0px auto" }}>
      <div className="report-navigator-container">
        <ReportSwitcher
          activeFeedback={activeFeedback}
          updateActiveFeedback={updateActiveFeedback}
        />
        <ReportContent
          activeFeedback={activeFeedback}
          activeContent={content[toLowerCamelCase(activeFeedback)]}
          resumeAsJSON={resumeAsJSON}
          experienceVisible={experienceVisible}
          updateExperienceVisibility={updateExperienceVisibility}
        />
      </div>
      <ResumeImage filename={filename} resumeImageSrc={resumeImageSrc} />
    </div>
  );
}

const toLowerCamelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function ReportContent({ activeFeedback, activeContent, resumeAsJSON, experienceVisible, updateExperienceVisibility }) {
  let feedbackComponent;
  if (activeFeedback === "Prechecks") {
    feedbackComponent = Prechecks({ activeContent });
  } else if (activeFeedback === "Required Info") {
    feedbackComponent = RequiredInfo({ activeContent });
  } else if (activeFeedback === "ATS Scan") {
    feedbackComponent = ParseTable({ resumeAsJSON });
  } else if (activeFeedback === "Experience") {
    feedbackComponent = Experience({ activeContent, experienceVisible, updateExperienceVisibility });
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
    components.push(
      <FeedbackComponent
        checked={checked}
        title={options[key][checked.toString()]["title"]}
        subtitle={options[key][checked.toString()]["subtitle"]}
      />
    );
  });
  return (
    <div>
      {components}
    </div>
  )
}

function RequiredInfo({ activeContent }) {
  const checklist = activeContent.checklist;
  const options = copy["Required Info"];
  const booleanChecks = ["name", "phoneNumber", "linkedin", "emails"];
  let components = [];
  booleanChecks.forEach(key => {
    const checked = checklist[key];
    console.log(key);
    components.push(
      <FeedbackComponent
        checked={checked}
        title={options[key][checked.toString()]["title"]}
        subtitle={options[key][checked.toString()]["subtitle"]}
      />
    );
  });
  //these checks are nested
  let allDegreesPresent = true;
  let allGPAPresent = true;
  Object.keys(checklist.schools).forEach(schoolName => {
    const school = checklist.schools[schoolName];
    if (!school.degree) {
      allDegreesPresent = false;
      components.push(
        <FeedbackComponent
          checked={false}
          title={"Missing degree name from " + schoolName}
          subtitle={"Double check that your degree from " + schoolName + " is present, and can be parsed by an ATS."}
        />
      );
    }
    if (!school.gpa) {
      allGPAPresent = false;
      components.push(
        <FeedbackComponent
          checked={false}
          title={"Missing GPA name from " + schoolName}
          subtitle={"Double check that your GPA from " + schoolName + " is present (if it's over 3.0), and can be parsed by an ATS."}
        />
      );
    }
  });
  if (allDegreesPresent) {
    components.push(
      <FeedbackComponent
        checked={true}
        title={"Your degree was listed and found."}
        subtitle={"Good work including essential information."}
      />
    );
  }
  if (allGPAPresent) {
    components.push(
      <FeedbackComponent
        checked={true}
        title={"Your GPA was listed and found"}
        subtitle={"Good work including essential information."}
      />
    );
  }

  Object.keys(checklist.positions).forEach(positionName => {
    const position = checklist.positions[positionName];
    if (!position.endMonth) {
      components.push(
        <FeedbackComponent
          checked={false}
          title={"Missing end date for position " + positionName}
          subtitle={"Missing end date for position " + positionName}
        />
      );
    }
    if (!position.endYear) {

    }
    if (!position.startMonth) {

    }
    if (!position.startYear) {

    }
  });
  return (
    <div>
      {components}
    </div>
  )
}

function FeedbackComponent({ checked, title, subtitle }) {
  let img;
  if (checked) {
    img = <img alt="✓" src="./img/check.png" className="feedback-component-check" />
  } else {
    img = <img alt="x" src="./img/dot.png" className="feedback-component-check" />
  }
  return (
    <div className="feedback-component-container">
      {img}
      <p className="feedback-component-title">{title}</p>
      <p className="feedback-component-subtitle">{subtitle}</p>
    </div>
  )
}

function ResumeImage({ filename, resumeImageSrc }) {
  return (
    <div className="report-resume-img-container">
      <img alt="" src={resumeImageSrc} className="report-resume-img" />
      <p className="report-resume-filename">{filename}</p>
    </div>
  )
}