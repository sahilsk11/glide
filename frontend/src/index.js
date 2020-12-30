import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

//component imports
import Dropzone from "./Dropzone/Dropzone";

function App() {
  const [appState, updateAppState] = useState("landing");
  const [filename, updateFilename] = useState("");
  const [pageData, updatePageData] = useState({});
  useEffect(() => {
    if (appState === "submitted") {
      console.log(filename);
      const endpoint = "http://localhost:5000/getResumeDetails?filename=" + filename;
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          updatePageData(data)
          updateAppState("results")
        });
      updateAppState("loading");
    }
  }, [appState]);
  if (appState == "landing") {
    return (
      <div className="dropzone-container">
        <Dropzone updateAppState={updateAppState} updateFilename={updateFilename} />
      </div>
    );
  } else if (appState === "loading") {
    return <>loading</>;
  } else if (appState === "results") {
    return <>{JSON.stringify(pageData)}</>;
  } else {
    return <>fuck</>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);