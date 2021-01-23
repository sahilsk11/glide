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
          <>Below are crowdsourced resume tips. To submit a helpful tip, fill out <a className="glide-link" href="https://airtable.com/shrP9Dx3riOCUJVDL" target="_blank">this form</a>.</>
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
    <div className="resource-container">
      <a href={href} className="resource-link" target="_blank">
        <div className="resource-content">
          <div>
            <img src={imgSrc} className="helpful-tips-resource-img" alt="" />
          </div>
          <div className="resource-text-container">
            <h3 className="resource-title">{title}</h3>
            <p className="resource-description">{description}</p>
          </div>
        </div>
      </a>
    </div>
  )
}

function getResourceData() {
  return [
    {
      title: "YC Work at a Startup",
      imgSrc: "./img/resource-images/yc-logo.png",
      description: "Submit one application for hundreds of top jobs at Y Combinator companies.",
      href: "https://workatastartup.com"
    },
    {
      title: "Levels.fyi",
      imgSrc: "./img/resource-images/levels-fyi.png",
      description: "Levels.fyi is a great resource for salary comparison for intern and full time positions as well as to see who is currently hiring.",
      href: "https://levels.fyi?ref=glidecv.com"
    },
    {
      title: "The Codex",
      imgSrc: "./img/resource-images/codex.png",
      description: "The Codex shows you how to build fun, practical projects with Python. Projects are always a great add to your resume to show employers you are a self-starter. Get 20% off with promo code GLIDE20.",
      href: "https://thecodex.me?ref=glidecv.com"
    },
    {
      title: "Resume Puppy",
      imgSrc: "https://resumepuppy.com/wp-content/uploads/2020/10/cropped-RPlogo-full-colour@3x-180x180.png",
      description: "At ResumePuppy, we're committed to providing you with the best technology to help you reach your goals. Whether you need to quickly build a resume for a particular job or track multiple resume versions our tools will help you sort through the small stuff, so you can focus on what you do best.",
      href: "https://resumepuppy.com?ref=glidecv.com"
    },
  ]
}