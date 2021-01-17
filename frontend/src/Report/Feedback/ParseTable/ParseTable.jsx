import React from "react";
import "./parse-table.css";

import Flag from "../Flag/Flag";

export default function ParseTable({ resumeAsJSON }) {
  return (
    <>
      <Flag type="suggestion" message="If the parsed resume information appears wrong, your resume is being read wrong by applicant tracking systems (ATS). Please ensure formatting aligns using this guide." />
      <h2>Summary</h2>
      <Summary resumeAsJSON={resumeAsJSON} />
      <h2>Work Experience</h2>
      <WorkExperience positions={resumeAsJSON.positions} />
    </>
  )
}

function Summary({ resumeAsJSON }) {
  function listToString(list) {
    if (!list) {
      return "null";
    }
    let out = "";
    for (let i = 0; i < list.length; i++) {
      out += list[i];
      if (i !== list.length - 1) {
        out += ", "
      }
    }
    return out;
  }
  function getKeyIfExists(key, value = "value") {
    if (resumeAsJSON[key]) {
      return listToString(resumeAsJSON[key].map(e => e[value]));
    }
    return "null";
  }
  let emails = getKeyIfExists("emails");
  let phones = getKeyIfExists("phones");
  let schools = "null";
  if (resumeAsJSON.schools) {
    schools = resumeAsJSON.schools.map(e => School(e));
  }
  let links = getKeyIfExists("links", "url");
  return (
    <table className="parse-table">
      <tr className="heading-tr">
        <th className="parse-table-th">Information</th>
        <th className="parse-table-th">Parsed</th>
      </tr>
      <tbody>
        <tr>
          <td className="parse-table-td">Name(s)</td>
          <td className="parse-table-td">{listToString(resumeAsJSON.names)}</td>
        </tr>
        <tr>
          <td className="parse-table-td">Email</td>
          <td className="parse-table-td">{emails}</td>
        </tr>
        <tr>
          <td className="parse-table-td">Phone</td>
          <td className="parse-table-td">{phones}</td>
        </tr>
        <tr>
          <td className="parse-table-td">Schools</td>
          <td className="parse-table-td">{schools}</td>
        </tr>
        <tr>
          <td className="parse-table-td">Links</td>
          <td className="parse-table-td">{links}</td>
        </tr>
        <tr>
          <td className="parse-table-td">Skills</td>
          <td className="parse-table-td">{(resumeAsJSON.summary && resumeAsJSON.summary.skills) || "null"}</td>
        </tr>
      </tbody>
    </table>
  )
}

function School(school) {
  let gpa = "null";
  if (school.gpa) {
    gpa = school.gpa.toString() + "/" + school.gpaMax.toString();
  }
  return (
    <ul className="parse-table-ul">
      <p className="school-title">{school.org}</p>
      <li className="indented-li">{school.degree} {school.field}</li>
      <li className="indented-li">Attendance: {parseStartEndString(school)}</li>
      <li className="indented-li">GPA: {gpa}</li>
      <li className="indented-li">Summary: {school.summary}</li>
    </ul>
  )
}

function parseStartEndString(position) {
  let start = "null";
  let end = "null";
  if (position.start) {
    start = position.start.month + "/" + position.start.year;
  }
  if (position.end) {
    end = position.end.month + "/" + position.end.year;
  }
  if (start === end) {
    return start;
  }
  return start + " - " + end;
}

function WorkExperience({ positions }) {
  let rows = [];
  if (!positions) {
    rows = [<tr>
      <td className="parse-table-td">null</td>
      <td className="parse-table-td">null</td>
      <td className="parse-table-td">null</td>
      <td className="parse-table-td">null</td>
    </tr>];
  } else {
    positions.forEach(position => {
      const dateStr = parseStartEndString(position)
      rows.push(
        <ExperienceRow
          company={position.org}
          position={position.title}
          dates={dateStr}
          summary={position.summary || "null"}
        />
      )
    })
  }
  return (
    <table className="parse-table">
      <tr className="heading-tr">
        <th className="parse-table-th">Company</th>
        <th className="parse-table-th">Position</th>
        <th className="parse-table-th">Dates</th>
        <th className="parse-table-th">Summary</th>
      </tr>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

function ExperienceRow({ company, position, dates, summary }) {
  return (
    <tr>
      <td className="parse-table-td">{company}</td>
      <td className="parse-table-td">{position}</td>
      <td className="parse-table-td">{dates}</td>
      <td className="parse-table-td">{summary}</td>
    </tr>
  )
}