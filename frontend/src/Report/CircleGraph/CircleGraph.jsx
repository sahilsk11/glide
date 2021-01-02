import React from "react";
import "./circle-graph.css";

export default function CircleGraph({ score }) {
  let backgroundColor;
  let primaryColor;
  if (score < 50) {
    backgroundColor = '#ff8080';
    primaryColor = '#eb1e1e';
  } else if (score < 70) {
    backgroundColor = '';
    primaryColor = '#ff8080';
  } else if (score < 85) {
    backgroundColor = '';
    primaryColor = '#ff8080';
  } else if (score < 93) {
    backgroundColor = '';
    primaryColor = '#ff8080';
  } else {
    backgroundColor = '';
    primaryColor = '#ff8080';
  }
  return (
    <div className="graph-container" style={{ width: "200px", height: "200px" }}>
      <div className="graph-background-circle" style={{ backgroundColor }} />
      <p className="graph-score" style={{ color: primaryColor }}>{score}</p>
    </div>
  )
}