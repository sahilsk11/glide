import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, useLocation, useHistory } from "react-router-dom";
import "./index.css";


//component imports
import Nav from "./Nav/Nav";
import Landing from "./Landing/Landing";
import Footer from "./Footer/Footer";
import Report from "./Report/Report";
import Error from "./Error/Error";


function App() {
  const d = {
    "experience": {
      "aggregateScore": 11.2,
      "positions": [
        {
          "org": "Prudential Financial",
          "score": 7.3,
          "skills": [],
          "summaryExperience": "\n\n\u25cf\tBuilt internal metadata tool to condense microservice information for better maintainability\r\n\n\n\u25cf\tDeveloped and implemented a manifest processing tool for greater standardization across business unit\r\n\n\n\u25cf\tUsed Python, Spring Boot Microservices, Apache Kafka, JSON, and YAML",
          "title": "Software Engineering Intern",
          "verbs": [
            "implemented",
            "built",
            "developed"
          ]
        },
        {
          "org": "The Codex",
          "score": 2.4,
          "skills": [],
          "summaryExperience": "\n\n\u2022\tLed platform growth to 400 new users per week and 7,500+ users internationally\r\n\n\n\u25cf\tConducted 30+ customer interviews per month to collect actionable insights\r\n\n\n\u25cf\tIncreased user conversion and retention rate by 20% by conducting data driven experiments",
          "title": "Cofounder & Head of Product",
          "verbs": [
            "increased",
            "conducted",
            "led"
          ]
        },
        {
          "org": "Future Engineers Camp",
          "score": 1.5,
          "skills": [],
          "summaryExperience": "Co-founded in 2014 with a mission to provide students with high-energy, personalized, and hands-on\r\ntechnology education in a summer camp setting\r\n\n\n\u25cf\tScaled the business to over $80k in revenue, 700+ students, and 30+ staff members",
          "title": "President & Cofounder",
          "verbs": []
        }
      ],
      "skills": 18,
      "skillsList": [
        "Skills\r\n\u25cf\tSoftware: Python, Spring Boot/ Java, HTML/CSS, React Native, SQL, YAML\r\n\u25cf\tDesign: Figma, Photoshop/Illustrator, Sketch, Invision\r\n\u25cf\tMarketing: Amplitude, Google Analytics, Hotjar, Convertkit, SEO, Growth Strategy"
      ],
      "verbScore": {
        "Future Engineers Camp": 0,
        "Prudential Financial": 100,
        "The Codex": 100
      }
    },
    "filename": "Sameer_Kapur_Resume.pdf",
    "prechecks": {
      "doesFollowNaming": true,
      "isAPage": true,
      "isFilePDF": true,
      "isFileScannable": true,
      "score": 85
    },
    "requiredInfo": {
      "checklist": {
        "emails": true,
        "linkedin": true,
        "name": true,
        "phoneNumber": true,
        "positions": {
          "Future Engineers Camp": {
            "endMonth": true,
            "endYear": true,
            "startMonth": true,
            "startYear": true
          },
          "Prudential Financial": {
            "endMonth": true,
            "endYear": true,
            "startMonth": true,
            "startYear": true
          },
          "The Codex": {
            "endMonth": true,
            "endYear": true,
            "startMonth": true,
            "startYear": true
          }
        },
        "schools": {
          "Purdue University": {
            "degree": true,
            "gpa": true
          }
        }
      },
      "score": 100
    },
    "resumeImageSrc": "http://localhost:5000/getResumeImage?filename=3U1P2P1F9V.jpg",
    "resumeJSON": {
      "createdAt": 1610872094329,
      "emails": [
        {
          "canonical": "kapur10@purdue.edu",
          "value": "kapur10@purdue.edu"
        }
      ],
      "lastStoryAt": 1610872094329,
      "links": [
        {
          "domain": "linkedin.com",
          "path": "/in/kapursameer",
          "url": "linkedin.com/in/kapursameer"
        },
        {
          "domain": "sameerkapur.com",
          "path": null,
          "url": "sameerkapur.com"
        },
        {
          "domain": "anvilstartups.com",
          "path": null,
          "url": "https://www.anvilstartups.com"
        },
        {
          "domain": "thinktwice.me",
          "path": null,
          "url": "http://thinktwice.me"
        },
        {
          "domain": "thecodex.me",
          "path": null,
          "url": "https://thecodex.me"
        },
        {
          "domain": "groundup.vc",
          "path": null,
          "url": "https://groundup.vc"
        },
        {
          "domain": "matchly.co",
          "path": null,
          "url": "http://matchly.co"
        }
      ],
      "names": [
        "Sameer Kapur"
      ],
      "phones": [
        {
          "type": "home",
          "value": "(408) 805-1733"
        }
      ],
      "positions": [
        {
          "isCurrent": true,
          "org": "The Codex",
          "start": {
            "month": 6,
            "timestamp": 1590994800000,
            "year": 2020
          },
          "summary": "\n\n\u2022\tLed platform growth to 400 new users per week and 7,500+ users internationally\r\n\n\n\u25cf\tConducted 30+ customer interviews per month to collect actionable insights\r\n\n\n\u25cf\tIncreased user conversion and retention rate by 20% by conducting data driven experiments",
          "title": "Cofounder & Head of Product"
        },
        {
          "end": {
            "month": 8,
            "timestamp": 1596265200000,
            "year": 2020
          },
          "org": "Prudential Financial",
          "start": {
            "month": 6,
            "timestamp": 1590994800000,
            "year": 2020
          },
          "summary": "\n\n\u25cf\tBuilt internal metadata tool to condense microservice information for better maintainability\r\n\n\n\u25cf\tDeveloped and implemented a manifest processing tool for greater standardization across business unit\r\n\n\n\u25cf\tUsed Python, Spring Boot Microservices, Apache Kafka, JSON, and YAML",
          "title": "Software Engineering Intern"
        },
        {
          "end": {
            "month": 7,
            "timestamp": 1530428400000,
            "year": 2018
          },
          "org": "Future Engineers Camp",
          "start": {
            "month": 4,
            "timestamp": 1396335600000,
            "year": 2014
          },
          "summary": "Co-founded in 2014 with a mission to provide students with high-energy, personalized, and hands-on\r\ntechnology education in a summer camp setting\r\n\n\n\u25cf\tScaled the business to over $80k in revenue, 700+ students, and 30+ staff members",
          "title": "President & Cofounder"
        }
      ],
      "schools": [
        {
          "degree": "B.S. in Computer Information Technology",
          "end": {
            "month": 5,
            "timestamp": 1651388400000,
            "year": 2022
          },
          "field": "Computer Information Technology",
          "gpa": "3.77",
          "gpaMax": "4",
          "org": "Purdue University",
          "start": {
            "month": 8,
            "timestamp": 1533106800000,
            "year": 2018
          },
          "summary": "Purdue University, West Lafayette, IN (GPA: 3.77)\tAug 2018- May 2022\r\n\n\n\u25cf B.S. in Computer Information Technology\r\n\n\n\u25cf Minor in Organizational Leadership"
        }
      ],
      "summary": {
        "experience": "Sameer Kapur's experience appears to be strongly concentrated in Information Technology (mostly Programming) and slightly concentrated in Marketing (mostly Digital). Sameer Kapur's experience appears to be lower-to-mid level, with about 5 years of experience, with 5 years of management experience, including a high-level position.",
        "management": "Current position is a low-level management role: Cofounder & Head of Product\r\nStarting on 6/1/2020, the candidate held the following low-level management position for 7 months:\r\n\tTitle: Cofounder & Head of Product for The Codex\r\nStarting on 4/1/2014, the candidate held the following executive-level management position for 4 years and 3 months:\r\n\tTitle: President & Cofounder for Future Engineers Camp",
        "managementTime": {
          "months": 59,
          "years": 5
        },
        "skills": "Skills\r\n\u25cf\tSoftware: Python, Spring Boot/ Java, HTML/CSS, React Native, SQL, YAML\r\n\u25cf\tDesign: Figma, Photoshop/Illustrator, Sketch, Invision\r\n\u25cf\tMarketing: Amplitude, Google Analytics, Hotjar, Convertkit, SEO, Growth Strategy",
        "workTime": {
          "months": 59,
          "years": 5
        }
      }
    },
    "score": 54,
    "success": true
  }




  let history = useHistory();
  const location = useLocation();
  const pathName = location.pathname.replace("/", "");

  const initialState = pathName === "report" ? "results" : "landing";
  const initialData = process.env.NODE_ENV !== "production" ? d : { success: false };

  const [appState, updateAppState] = useState(initialState);
  const [sharingOptIn, updateSharingOptIn] = useState(true);
  const [filename, updateFilename] = useState("");
  const [pageData, updatePageData] = useState(initialData);
  const [experienceVisible, updateExperienceVisibility] = useState(false);
  const simulateProd = false;
  const isDev = process.env.NODE_ENV !== "production" && !simulateProd;
  const host = isDev ? "http://localhost:5000" : "https://glidecv.com/server";

  function redirect(path) {
    history.push(path);
  }

  useEffect(() => {
    if (pathName === "report") {
      updateAppState("results");
    } else if (pathName === "") {
      updateAppState("landing");
    } else if (pathName != "error") {
      redirect("error");
    } else {
      updateAppState("error");
    }
  }, [pathName]);

  useEffect(() => {
    if (appState === "submitted") {
      const endpoint = host + "/getResumeDetails?filename=" + filename + "&optIn=" + sharingOptIn + "&isDev=" + isDev;
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          updatePageData(data);
          if (!data.success) {
            redirect("error");
          } else {
            redirect("report");
          }
        }).catch((e) => {
          console.error(e);
          updatePageData({ success: false });
          redirect("error");
        });
      updateAppState("loading");
    }
  }, [appState]);
  let pageContent;
  if (appState === "landing") {
    pageContent = (
      <>
        <div className="page-content">
          <Landing
            updateAppState={updateAppState}
            updateFilename={updateFilename}
            host={host}
            sharingOptIn={sharingOptIn}
            updateSharingOptIn={updateSharingOptIn}
          />
        </div>
        <Footer host={host} />
      </>
    );
  } else if (appState === "loading") {
    pageContent = <LoadingScreen />
  } else if (appState === "results") {
    pageContent = (
      <>
        <div className="page-content">
          <Nav useYellowBackground={true} />
          <Report
            pageData={pageData}
            redirect={redirect}
            experienceVisible={experienceVisible}
            updateExperienceVisibility={updateExperienceVisibility}
          />
        </div>
        <Footer host={host} />
      </>
    );
  } else {
    pageContent = Error();
  }
  return pageContent;
}

function BackgroundWave() {
  return (
    <div className="background-wave-container">
      <img alt="" src="./img/wave-vector.svg" className="background-wave" />
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="loading-screen-container">
      <img alt="" src="./img/loading.gif" className="loading-gif" />
      <p className="loading-screen-text">Finding you a FAANG offer...</p>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Route path="/" component={App} />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);