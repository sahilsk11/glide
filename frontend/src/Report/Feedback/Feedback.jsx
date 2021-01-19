import React, { useState } from "react";
import "./feedback.css";
import copy from "./copy";

import ReportSwitcher from "./FeedbackNav/FeedbackNav";
import Experience from "./Experience/Experience";
import ParseTable from "./ParseTable/ParseTable";
import HelpfulTips from "./HelpfulTips/HelpfulTips";

export default function Feedback({ resumeImageSrc, content, resumeAsJSON, filename, experienceVisible, updateExperienceVisibility }) {
  const [activeFeedback, updateActiveFeedback] = useState("ATS Scan");

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
          content={content}
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

function ReportContent({ activeFeedback, activeContent, resumeAsJSON, experienceVisible, updateExperienceVisibility, content }) {
  console.log(content);
  let feedbackComponent;
  if (activeFeedback === "Checklist") {
    feedbackComponent = <>
      <Prechecks activeContent={content["prechecks"]} />
      <RequiredInfo activeContent={content["requiredInfo"]} />
    </>
  } else if (activeFeedback === "FAQ") {
    feedbackComponent = FAQSection();
  } else if (activeFeedback === "ATS Scan") {
    feedbackComponent = ParseTable({ resumeAsJSON });
  } else if (activeFeedback === "Experience") {
    feedbackComponent = Experience({ activeContent, experienceVisible, updateExperienceVisibility });
  } else if (activeFeedback === "Helpful Tips") {
    feedbackComponent = HelpfulTips();
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
  const componentNames = ["isFilePDF", "isFileScannable", "doesFollowNaming", "isAPage"]
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
  if (checklist.schools) {
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
  } else {
    allGPAPresent = false;
    allDegreesPresent = false;
  }
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
  if (checklist.positions) {
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
  }
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

function FAQSection() {
  const faqs = [
    {
      question: "How does Glide Calculate my score?",
      answer: "Similar to how applicant tracking systems work, Glide compares popular Software Engineering role keywords and skills with data found on your resume. Based on similarity, a score is produced to help you understand where you stand as an application. We also factor if you include required information found in our checklist section.",
    },
    {
      question: "What is an ATS?",
      answer: "ATS stands for applicant tracking systems. Most companies use ATS to screen applicants by using a resume parsing and grading algorithm to decide which applicants make it to the first round. "
    },
    {
      question: "How can I improve my score?",
      answer: <>If your resume is scanning incorrectly, use <a href="https://www.notion.so/Resume-Tips-and-General-Guidelines-Glide-efde853b2b0b48b59b76a66ae3a04d74" target="_blank" className="glide-link">this guide</a> to better format your resume. Check to see if all information on the checklist is included on your resume. If your experience score is low, consider adding to your skillset up by learning popular technologies from <a href="https://www.ziprecruiter.com/Career/Software-Engineer/Resume-Keywords-and-Skills" className="glide-link" target="_blank">this list</a>.<br /><br />Reminder: Glide is built for job seeks looking for software engineering roles.<br /><br />We’re offering students personalized advice from the creators of Glide tips to help perfect your resume. If you are interested in getting some eyes on your resume, <a className="glide-link" href="https://gumroad.com/l/XoLzX" target="_blank">see here</a>.</>,
    },
    {
      question: "Why is Glide limited to SWE candidates?",
      answer: "We’ve found that hiring for software engineering roles is far more objective than other roles. This allows us to provide an objective algorithm to evaluate how the strength of a resume. Oh and our team is well versed in applying for SWE roles and we’d like to share what has worked for us!",
    },
    {
      question: "I have more questions, how can I reach out?",
      answer: <>Shoot us a message through our feedback <a href="https://airtable.com/shr2dgrLZTvXliBD6" target="_blank" className="glide-link">form here</a>, and we’ll get back as soon as possible :)</>
    }
  ];
  const faqComponents = faqs.map(props => FAQ(props));
  return (
    <div>
      {faqComponents}
    </div>
  )
}

function FAQ({ question, answer }) {
  return (
    <>
      <hr className="feedback-hr" />
      <h3 className="feedback-faq-title">{question}</h3>
      <p className="feedback-faq-answer">{answer}</p>
    </>
  )
}