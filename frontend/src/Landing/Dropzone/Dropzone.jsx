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
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
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
      alert("Unable to submit resume. Please check the error message stated in the upload zone below"
      );
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
      SubmitButtonComponent={(props) => Submit({ ...props, sharingOptIn, updateSharingOptIn })}
      getFilesFromEvent={getFilesFromEvent}
      maxSizeBytes={1048576}
    />
  )
}

function Submit({ files, onSubmit, sharingOptIn, updateSharingOptIn }) {
  const handleSubmit = () => {
    onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }
  return (
    <div>
      <OptIn
        sharingOptIn={sharingOptIn}
        updateSharingOptIn={updateSharingOptIn}
      />
      <p className="dropzone-disclaimer">Disclaimer: Glide is built for software engineering interns and new grads. Take advice with caution.</p>
      <button onClick={handleSubmit} className="glide-btn dropzone-submit-btn">Scan My Resume</button>
      <p className="dropzone-agreement">By clicking the button above, I agree to the <a className="opt-in-link" href="https://www.notion.so/Glide-Privacy-Policy-and-Terms-of-Use-86d9f1a914704f86ae8ebbb3ec70ca24" target="_blank">Glide Terms of Use and Privacy Policy.</a></p>
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
        onChange={() => {
          updateSharingOptIn(!sharingOptIn)
        }}
      />
      <label className="opt-in-text">Want to share your resume with companies? </label>
    </div>
  )
}

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  // const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <div className="dropzone-input">
      <label>
        <img alt="" src="./img/resume-upload-img.png" className="dropzone-img" alt="" />
        <p className="dropzone-input-text">
          Drag & drop your resume here
          <br /><br />
          OR
        </p>
        <p className="glide-btn dropzone-btn-text">Browse</p>
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

