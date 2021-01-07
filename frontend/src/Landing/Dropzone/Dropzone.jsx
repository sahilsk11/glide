import React, { useState } from "react";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader';
import "./dropzone.css";
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

export default function FileDropzone({
  updateAppState,
  updateFilename,
  host,
  sharingOptIn,
  updateSharingOptIn
}) {
  const [allowSubmit, updateAllowSubmit] = useState(false);
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: host + "/postResume" } }
  console.log('hi');
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    console.log(status);
    if (status === "done") {
      const response = JSON.parse(xhr.response);
      updateFilename(response.filename);
      updateAllowSubmit(true);
    } else if (status === "exception_upload") {
      updateAllowSubmit(false);
    }
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    if (allowSubmit) {
      allFiles.forEach(f => f.remove());
      updateAppState("submitted");
    } else {
      alert("Unable to submit - Check Upload Message");
    }
  }

  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
        resolve(chosenFiles.map(f => f.fileObject))
      })
    })
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept=".pdf,.doc,.docx"
      maxFiles={1}
      InputComponent={Input}
      SubmitButtonComponent={Submit}
      getFilesFromEvent={getFilesFromEvent}
      maxSizeBytes={1048576}
    />
  )
}

function Submit({ files, onSubmit }) {
  const handleSubmit = () => {
    onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }
  return (
    <div>
      <OptIn />
      <button onClick={handleSubmit} className="dropzone-submit-btn dropzone-btn">Scan My Resume</button>
    </div>
  )
}

function OptIn({ sharingOptIn, updateSharingOptIn }) {
  return (
    <div className="opt-in-container">
      <input
        type="checkbox"
        className="opt-in-checkbox"
        checked={sharingOptIn}
        onClick={() => {
          // updateSharingOptIn(!sharingOptIn)
        }}
      />
      <label className="opt-in-text">Share my resume with recruiters & the Glide team (<a href="#" className="opt-in-link" target="_blank">privacy policy</a>)</label>
    </div>
  )
}

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  // const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <div className="dropzone-input">
      <label>
        <img src="./img/resume-upload-img.png" className="dropzone-img" alt="" />
        <p className="dropzone-input-text">
          Drag & drop your resume here
          <br /><br />
          OR
        </p>
        <p className="dropzone-btn dropzone-btn-text">Browse</p>
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />
      </label>
    </div >
  )
}

