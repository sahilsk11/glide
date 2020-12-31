import React from 'react';
import ReactDOM from 'react-dom';
import "./file-manager.css";

import App from './App';
import * as serviceWorker from './serviceWorker';

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
    return <>.</>;
  }
}

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
