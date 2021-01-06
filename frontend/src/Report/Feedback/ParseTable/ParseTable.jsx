import React from "react";
import "./parse-table.css";

export default function ParseTable({ resumeAsJSON }) {
  console.log(resumeAsJSON);
  return (
    <>
      <h2>Summary</h2>
      <Summary resumeAsJSON={resumeAsJSON} />
      <h2>Work Experience</h2>
      <WorkExperience positions={resumeAsJSON.positions} />
    </>
  )
}

function Summary({ resumeAsJSON }) {
  function listToString(list) {
    console.log(list);
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
    <table className="table">
      <tr>
        <th>Information</th>
        <th>Parsed</th>
      </tr>
      <tr>
        <td>Name(s)</td>
        <td>{listToString(resumeAsJSON.names)}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{emails}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{phones}</td>
      </tr>
      <tr>
        <td>Schools</td>
        <td>{schools}</td>
      </tr>
      <tr>
        <td>Links</td>
        <td>{links}</td>
      </tr>
      <tr>
        <td>Skills</td>
        <td>{resumeAsJSON.summary.skills || "null"}</td>
      </tr>
    </table>
  )
}

function School(school) {
  let gpa = "null";
  if (school.gpa) {
    gpa = school.gpa.toString() + "/" + school.gpaMax.toString();
  }
  return (
    <ul>
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
  if (start == end) {
    return start;
  }
  return start + " - " + end;
}

function WorkExperience({ positions }) {
  let rows = [];
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
  return (
    <table>
      <tr>
        <th>Company</th>
        <th>Position</th>
        <th>Dates</th>
        <th>Summary</th>
      </tr>
      {rows}
    </table>
  )
}

function ExperienceRow({ company, position, dates, summary }) {
  return (
    <tr>
      <td>{company}</td>
      <td>{position}</td>
      <td>{dates}</td>
      <td>{summary}</td>
    </tr>
  )
}