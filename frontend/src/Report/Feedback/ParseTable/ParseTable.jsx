import React from "react";
import "./parse-table.css";

export default function ParseTable({ resumeAsJSON }) {
  console.log(resumeAsJSON);
  return (
    <>
      <table className="table">
        <Summary resumeAsJSON={resumeAsJSON} />
      </table>
      <WorkExperience positions={resumeAsJSON.positions} />
    </>
  )
}

function Summary({ resumeAsJSON }) {
  return (
    <>
      <tr>
        <th>Information</th>
        <th>Parsed</th>
      </tr>
      <tr>
        <td>Name(s)</td>
        <td>{JSON.stringify(resumeAsJSON.names)}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{JSON.stringify(resumeAsJSON.names)}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{"hi"}</td>
      </tr>
      <tr>
        <td>Schools</td>
        <td>{JSON.stringify(resumeAsJSON.schools)}</td>
      </tr>
      <tr>
        <td>Degree</td>
        <td>{"hi"}</td>
      </tr>
      <tr>
        <td>Links</td>
        <td>{"hi"}</td>
      </tr>
      <tr>
        <td>Summary</td>
        <td>{"hi"}</td>
      </tr>
      <tr>
        <td>Skills</td>
        <td>{"hi"}</td>
      </tr>
    </>
  )
}

function WorkExperience({ positions }) {
  let rows = [];
  positions.forEach(position => {
    rows.push(
      <ExperienceRow
        company={position.org}
        position={position.title}
        dates={position.start.month + "/" + position.start.year}
        summary={position.summary}
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

function ExperienceRow({company, position, dates, summary}) {
  return (
    <tr>
      <td>{company}</td>
      <td>{position}</td>
      <td>{dates}</td>
      <td>{summary}</td>
    </tr>
  )
}