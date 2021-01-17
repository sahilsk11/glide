import React from "react";
import "./experience.css";

import CircleGraph from "../../ScoreVisual/CircleGraph";

export default function Experience({ activeContent, experienceVisible, updateExperienceVisibility }) {
  if (!experienceVisible) {
    return <ViewEvaluation updateExperienceVisibility={updateExperienceVisibility} />
  } else {
    return (
      <div>
        <h2 className="experience-subtitle">Skill Insight</h2>
        <SkillInsight
          score={activeContent.skills}
          keywords={activeContent.skillsList}
        />

        <ExperienceInsight activeContent={activeContent} />
      </div>
    )
  }
}

function ViewEvaluation({ updateExperienceVisibility }) {
  return (
    <div className="experience-disclaimer-container">
      <p className="experience-disclaimer-text">
        Important Note:
        <br /><br />
        The experience section is a simple, meaningful way to understand the strengths and weaknesses in your skills and experience through a hollistic approach.
        <br /><br />
        Similar to how applicant tracking systems work, Glide compares popular Software Engineering role keywords and skills with data found on your resume. Based on similarity, a score is produced to help you understand where you stand as an application.
        <br /><br />
        The Glide algorithm takes into account company name, role, and role summary, with the greatest weight places on the keywords and skills found in your role summary. Take evaluation with caution as every recruiting processes vary greatly between companies.
      </p>
      <button className="glide-btn" onClick={() => updateExperienceVisibility(true)}>View Evaluation</button>
    </div>
  )
}

function SkillInsight({ score, keywords, title }) {
  let keywordComponent = keywords.map(word => <SkillKeyword name={word} />);
  if (keywordComponent.length == 0) {
    keywordComponent = <p>No skill keywords were found. Check the ATS tab to ensure they were scanned correctly.</p>
  }
  if (title) {
    title += ", "
  }
  return (
    <div className="experience-skill-insight">
      <div className="experience-skill-row">
        <><ScoreVisual score={score} /></>
        <p className="experience-eval-text">
          Glide regularly scans software enginnering job posts to determine top in demand skills. Consider adding to your skillset up by learning popular technologies from this <a href="#" className="glide-link">list</a>.
            <br /><br />
          We found the following skills on your resume.
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
    </div>
  )
}

function ExperienceInsight({ activeContent }) {
  const experiences = activeContent.positions.map(position => {
    return <IndividualExperienceAnalysis
      org={position.org}
      title={position.title}
      description={position.summaryExperience}
      keywords={position.skills}
      strongVerbs={position.verbs}
    />
  });
  return (
    <>
      <div className="experience-skill-insight">
        <div className="experience-skill-row">
          <><ScoreVisual score={activeContent.aggregateScore} /></>
          <div>
            <h2 className="experience-subtitle" style={{ marginLeft: "30px" }}>Experience Insight</h2>
            <p className="experience-eval-text">
              Glide compares popular Software Engineering role descriptions to analyze matching keywords found on your resume to help you understand where you stand as an application. <span className="experience-strong-verb">Strong</span> verbs and <span className="experience-keyword">
                technical keywords</span> are highlighted.
            </p>
          </div>
        </div>
        {experiences}
      </div>
    </>
  )
}

function IndividualExperienceAnalysis({
  title,
  org,
  description,
  keywords,
  strongVerbs
}) {
  if (title) {
    title += ", "
  }
  let experienceDescription = [];
  if (description) {
    description.split(/[ \n]/).forEach(word => {
      let ogWord = word;
      word = word.replace(/\W/g, ' ');
      
      word = word.trim()
      if (keywords.includes(word.toLowerCase())) {
        experienceDescription.push(<span className="experience-keyword">{word}</span>)
      } else if (strongVerbs.includes(word.toLowerCase())) {
        experienceDescription.push(<span className="experience-strong-verb">{word}</span>)
      } else {
        console.log(word);
        experienceDescription.push(<>{ogWord}</>)
      }
      experienceDescription.push(" ")
    })
  }
  return (
    <div className="experience-analysis-container">
      <h3 className="experience-title">{title}{org}</h3>
      <p className="experience-description">
        {experienceDescription}
      </p>
    </div>
  )
}