import React, { useState } from "react";
import "./experience.css";

import CircleGraph from "../../ScoreVisual/CircleGraph";

export default function Experience({ activeContent }) {
  const [contentVisible, updateContentVisibility] = useState(false);

  if (!contentVisible) {
    return (
      <div>
        <button className="glide-btn" onClick={() => updateContentVisibility(true)}>View Evaluation</button>
      </div>
    );
  } else {
    console.log(activeContent.positions)
    const experiences = activeContent.positions.map(position => {
      return <SkillInsight
        score={position.score}
        description={"Based on your skills, an ATS system may rank you as 68. Consider adding more from this list. We only recommend including these keywords in the context of your experience. We found the following skills on your resume."}
        keywords={position.verbs}
      />
    });
    console.log(experiences);
    return (
      <div>
        <h2>Skill Insight</h2>
        <SkillInsight score={10} description={"Based on your skills, an ATS system may rank you as 68. Consider adding more from this list. We only recommend including these keywords in the context of your experience. We found the following skills on your resume."} keywords={["python", "microservices"]} />

        <h2>Experience Insight</h2>
        {experiences}
      </div>
    )
  }
}

function SkillInsight({ score, description, keywords }) {
  let keywordComponent = keywords.map(word => <SkillKeyword name={word} />);
  if (keywordComponent.length == 0) {
    keywordComponent = <p>no strong verbs were found</p>
  }
  return (
    <div className="experience-skill-insight">
      <div className="experience-skill-row">
        <><ScoreVisual score={score} /></>
        <p className="experience-eval-text">
          {description}
        </p>
      </div>
      <div className="experience-keyword-container">
        {keywordComponent}
      </div>
    </div>
  )
}

function SkillKeyword({ name }) {
  return (
    <div className="skill-keyword">
      <span>
        <img src="./img/prop-check.png" className="skill-check" />
      </span>
      <p className="skill-text">{name}</p>
    </div>
  )
}

function ScoreVisual({ score }) {
  let backgroundColor;
  let primaryColor;
  if (score < 50) {
    backgroundColor = 'rgba(253, 239, 237, 1)';
    primaryColor = 'rgba(236, 92, 76, 1)';
  } else if (score < 90) {
    backgroundColor = 'rgba(247, 232, 210, 1)';
    primaryColor = 'rgba(242, 167, 59, 1)';
  } else {
    backgroundColor = 'rgba(218, 243, 223, 1)';
    primaryColor = 'rgba(94, 202, 117, 1)';
  }
  return (
    <div>
      <div style={{ backgroundColor: backgroundColor }} className="experience-score-background">
        <p style={{ color: primaryColor }} className="experience-score-value">{score}</p>
      </div>
      <ScoreLabel score={score} />
    </div>
  )
}

function ScoreLabel({ score }) {
  let backgroundColor;
  let primaryColor;
  let text;
  if (score < 50) {
    backgroundColor = 'rgba(253, 239, 237, 1)';
    primaryColor = 'rgba(236, 92, 76, 1)';
    text = "Critical";
  } else if (score < 90) {
    backgroundColor = 'rgba(247, 232, 210, 1)';
    primaryColor = 'rgba(242, 167, 59, 1)';
    text = "On Track";
  } else {
    backgroundColor = 'rgba(218, 243, 223, 1)';
    primaryColor = 'rgba(94, 202, 117, 1)';
    text = "Looks Good";
  }
  return (
    <div className="report-label experience-label" style={{ backgroundColor }}>
      <p className="report-label-text experience-label-text" style={{ color: primaryColor }}>{text}</p>
    </div>
  )
}