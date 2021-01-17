import React from "react";
import "./helpful-tips.css";

import Flag from "../Flag/Flag";

export default function HelpfulTips() {
  const resourceData = getResourceData();
  const resourceComponents = resourceData.map(resourceProps => Resource(resourceProps));
  return (
    <div>
      <Flag
        type="suggestion"
        message={
          <>Below are crowdsourced resume tips. To submit a helpful tip, fill out <a className="glide-link" href="#">this form</a>.</>
        }
      />
      <div className="resources-container">
        {resourceComponents}
      </div>
    </div>
  )
}

function Resource({ title, imgSrc, description, href }) {
  return (
    <div className="resource-container" onClick={() => window.open(href, "_blank")}>
      <div className="resource-content">
        <div>
          <img src={imgSrc} className="helpful-tips-resource-img" alt="" />
        </div>
        <div className="resource-text-container">
          <h3 className="resource-title">{title}</h3>
          <p className="resource-description">{description}</p>
        </div>
      </div>
    </div>
  )
}

function getResourceData() {
  return [
    {
      title: "YC Work at a Startup",
      imgSrc: "./img/resource-images/yc-logo.png",
      description: "Submit one application for hundreds of top jobs at Y Combinator companies.",
      href: "#"
    },
    {
      title: "Levels.fyi",
      imgSrc: "./img/resource-images/levels-fyi.png",
      description: "Levels.fyi is a great resource for salary comparison for intern and full time positions as well as to see who is currently hiring.",
      href: "#"
    },
    {
      title: "The Codex",
      imgSrc: "./img/resource-images/codex.png",
      description: "The Codex shows you how to build fun, practical projects with Python. Projects are always a great add to your resume thos employers you are a self-starter.",
      href: "#"
    }
  ]
}