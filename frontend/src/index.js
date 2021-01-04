import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

//component imports
import Landing from "./Landing/Landing";
import Footer from "./Footer/Footer";
import Report from "./Report/Report";

function App() {
  const d = {
    "analysis": {
      "isFilePDF": true,
      "isFileScannable": true,
      "missingElements": [
        "email",
        "phoneNumber",
        "linkedin",
        "gpa"
      ],
      "points": 81
    },
    "resumeJSON": {
      "createdAt": 1609733443764,
      "lastStoryAt": 1609733443764,
      "links": [
        {
          "domain": "symops.com",
          "path": null,
          "url": "https://symops.com"
        },
        {
          "domain": "sahilkapur.com",
          "path": null,
          "url": "sahilkapur.com"
        }
      ],
      "names": [
        "Sahil Kapur"
      ],
      "positions": [
        {
          "end": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "org": "Sym",
          "start": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "summary": "Minor\r\n\n\n\u2022 Collaborated with engineering team to rebuild company\tGraduation: May 2022\r\nwebsite in React (https://symops.com)\tGPA: 3.71",
          "title": "Freelance Web Developer"
        },
        {
          "end": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "org": "HeadSpin",
          "start": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "summary": "Harker High School\r\n\n\n\u2022 Architected and built SWAT (sales weekly app tracker)\tSocieties: Varsity Golf, Red Cross,\r\nusing React.js, Node.js, Python, and SQL\tDECA\r\nGPA: 3.98\r\n\n\n\u2022 SWAT dashboard aggregates worldwide usage data of major mobile apps into actionable visualizations for\t.involvement.\r\nsales/marketing to drive leads",
          "title": "Software Engr Intern"
        },
        {
          "end": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "org": "Delta Mu Kappa",
          "start": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "title": "President"
        },
        {
          "end": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "org": "Ultron",
          "start": {
            "month": 1,
            "timestamp": 1577865600000,
            "year": 2020
          },
          "summary": "schoolers to find unique\r\n\n\n\u2022 Developed cloud-based Node.js system that controls\tvolunteering events\r\nlights, tracks workouts, and automates a majority of my\t\n\n\u2022 Developed in MIT incubator",
          "title": "Intent-based voice assistant"
        },
        {
          "end": {
            "month": 1,
            "timestamp": 1546329600000,
            "year": 2019
          },
          "org": "Prudential Financial",
          "start": {
            "month": 1,
            "timestamp": 1546329600000,
            "year": 2019
          },
          "summary": "\n\n\u2022 Lead planning/development of\r\n\n\n\u2022 Implemented microservice monitoring application\tPurdue's co-ed entrepreneurship\r\n\n\n\u2022 Tracks health metrics/downtime of 800 API services and\tfraternity (50+ members)\r\nupdates health on live status page\t\n\n\u2022 Focused on building community of makers in the Midwest\r\n\r\n.notable projects.\tMIT Launch   Participant\r\n\n\n\u2022 Created platform for high",
          "title": "Software Engr Intern"
        },
        {
          "end": {
            "month": 1,
            "timestamp": 1546329600000,
            "year": 2019
          },
          "org": "Cratus",
          "start": {
            "month": 1,
            "timestamp": 1546329600000,
            "year": 2019
          },
          "summary": ".skills.\r\n\n\n\u2022 Created and deployed AWS production-ready API\tLanguages: JavaScript, Java,\r\nendpoints written in Golang, Node.js, Python, and Java\tC/C++, Python3, Golang, SQL\r\n\n\n\u2022 Developed analysis system to measure execution speed,\tFrameworks: React, Express, Node,\r\nmemory usage, and scalability of endpoints in each\tFlask, Spring boot, MongoDB,\r\nlanguage\tMySQL\r\n\n\n\u2022 Automated verbose test reports for performance\tTechnologies: AWS, bash, git,\r\ncomparison of each endpoint\tApache, Docker, Nginx, Gunicorn,\r\nGoogle Cloud, REST APIs"
        },
        {
          "end": {
            "month": 1,
            "timestamp": 1546329600000,
            "year": 2019
          },
          "org": "ThinkTwice",
          "start": {
            "month": 1,
            "timestamp": 1546329600000,
            "year": 2019
          },
          "summary": "Other: Data structures, Figma, Linux\r\n\n\n\u2022 JS-based web app for users to view philanthropic\tOS, NLP, Raspberry Pi\r\nalternatives to blowing cash\r\n\n\n\u2022 Received 3rd place Product of the Day on Product Hunt\r\nwith over 8,000 pageviews in 2 days"
        },
        {
          "end": {
            "month": 1,
            "timestamp": 1514793600000,
            "year": 2018
          },
          "org": "First Tee",
          "start": {
            "month": 1,
            "timestamp": 1420099200000,
            "year": 2015
          },
          "summary": "\n\n\u2022 Built customized NLP service to parse intents\tShare my love of the game with\r\n\n\n\u2022 Service runs on Siri, Alexa, Google, and uses React.js for   economically and culturally diverse\r\nweb interface\tgrade-school students",
          "title": "Golf Coach"
        }
      ],
      "schools": [
        {
          "degree": "B.S.",
          "end": {
            "month": 1,
            "timestamp": 1609488000000,
            "year": 2021
          },
          "field": "Computer Science",
          "org": "Purdue University",
          "summary": "Amazon   Incoming Software Engr Intern (2021)\tPurdue University\r\nB.S. Computer Science, Economics"
        }
      ],
      "summary": {
        "experience": "Sahil Kapur's experience appears to be strongly concentrated in Information Technology (mostly Programming) and slightly concentrated in Sales (mostly General). Sahil Kapur has 6 years of work experience, with 5 years of management experience, including a high-level position.",
        "management": "Starting on 1/1/2020, the candidate held the following executive-level management position for 12 months:\r\n\tTitle: President for Delta Mu Kappa\r\nStarting on 1/1/2015, the candidate held the following low-level management position for 4 years:\r\n\tTitle: Golf Coach for First Tee",
        "managementTime": {
          "months": 60,
          "years": 5
        },
        "workTime": {
          "months": 77,
          "years": 6
        }
      }
    }
  }

  const [appState, updateAppState] = useState("landing");
  const [sharingOptIn, updateSharingOptIn] = useState(false);
  const [filename, updateFilename] = useState("");
  const [pageData, updatePageData] = useState(d);

  const isDev = process.env.NODE_ENV;
  console.log(pageData);
  useEffect(() => {
    if (appState === "submitted") {
      console.log(filename);
      const endpoint = "http://localhost:5000/getResumeDetails?filename=" + filename + "&optIn=" + sharingOptIn + "&isDev=" + isDev;
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          updatePageData(data)
          updateAppState("results")
        });
      updateAppState("loading");
    }
  }, [appState]);
  let pageContent;
  if (appState == "landing") {
    pageContent = (
      <>
        <div className="page-content">
          <Landing
            updateAppState={updateAppState}
            updateFilename={updateFilename} />
        </div>
        <Footer />
      </>
    );
  } else if (appState === "loading") {
    pageContent = <LoadingScreen />
  } else if (appState === "results") {
    pageContent = (
      <div className="page-content">
        <Report
          analysis={pageData.analysis}
          resumeJSON={pageData.resumeJSON}
          resumeImageSrc={pageData.resumeImageSrc}
        />
      </div>
    );
  } else {
    pageContent = <>.</>;
  }
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap" rel="stylesheet" />
      <BackgroundWave />
      {pageContent}
    </>
  )
}

function BackgroundWave() {
  return (
    <div className="background-wave-container">
      <img src="./img/wave-vector.svg" className="background-wave" />
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="loading-screen-container">
      <img src="./img/loading.gif" className="loading-gif" />
      <p className="loading-screen-text">Finding you a FAANG offer...</p>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);