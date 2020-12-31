import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

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
      accept="*"
      maxFiles={1}
    />
  )
}