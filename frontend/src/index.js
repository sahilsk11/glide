import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

//component imports
import Dropzone from "./Dropzone/Dropzone";

function App() {
  return (
    <div className="dropzone-container">
      <Dropzone />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);