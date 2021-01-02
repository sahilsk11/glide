import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader';
import "./dropzone.css";

export default function FileDropzone({ updateAppState, updateFilename }) {
  // specify upload params and url for your files
  const simlateProd = false;
  const endpoint = (simlateProd ? "" : "http://localhost:5000") + "/postResume"
  const getUploadParams = ({ meta }) => { return { url: endpoint } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
    if (status === "done") {
      updateFilename(file.name);
    }
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
    updateAppState("submitted");
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept=".pdf,.doc,.docx"
      maxFiles={1}
      InputComponent={Input}
    />
  )
}

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  const text = files.length > 0 ? 'Add more files' : 'Choose files'

  return (
    <div className="dropzone-input">
      <label style={{ cursor: 'pointer' }}>
        <img src="./img/resume-upload-img.png" className="dropzone-img" />
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