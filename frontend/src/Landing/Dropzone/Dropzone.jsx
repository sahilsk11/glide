import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader';
import "./dropzone.css";
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

export default function FileDropzone({ updateAppState, updateFilename, isDev }) {
  // specify upload params and url for your files
  const host = isDev ? "http://localhost:5000" : "http://resume.sahilkapur.com/server";
  const getUploadParams = ({ meta }) => { return { url: host+"/postResume" } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      updateFilename(file.name);
    }
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(f => f.remove());
    updateAppState("submitted");
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
      getFilesFromEvent={getFilesFromEvent}
    />
  )
}

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  // const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <div className="dropzone-input">
      <label style={{ cursor: 'pointer' }}>
        <img src="./img/resume-upload-img.png" className="dropzone-img" alt="" />
        <p className="dropzone-input-text">
          Drag & drop your resume here, or
          <span style={{ color: "#0076F1" }}><strong> browse</strong></span>
          .
        </p>
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple
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