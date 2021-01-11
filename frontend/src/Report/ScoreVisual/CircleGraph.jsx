import React from "react";
import "./circle-graph.css";

export default function CircleGraph({ score, isCircle=true }) {
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

  if (isCircle) {
    return (
      <div className="graph-container" style={{ width: "200px", height: "200px" }}>
        <div className="graph-background-circle" style={{ backgroundColor }} />
        <div className="graph-arc" style={{ borderColor: primaryColor }} />
        <p className="graph-score" style={{ color: primaryColor }}>{score}</p>
      </div >
    )
  }
  return (
    <div className="graph-container">
      <div className="graph-background-square" style={{ backgroundColor }} />
      <p className="graph-score" style={{ color: primaryColor }}>{score}</p>
    </div >
  )
}