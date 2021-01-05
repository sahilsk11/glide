import flask
import os
import ruleset
import PyPDF2
from pdf2image import convert_from_path 
import db_connection as db
from resume_converter import resume_to_dict

app = flask.Flask(__name__)
from flask_cors import CORS
CORS(app)

@app.route("/")
def healthcheck():
  return flask.jsonify({"status": 200, "message": "application is running"})

@app.route("/postResume", methods=['POST'])
def accept_resume():
  if authenticate(flask.request.json):
    # save resume as file
    print(flask.request.files)
    file = flask.request.files['file']
    file.save(os.path.join("saved-resumes/",file.filename))
    return flask.jsonify({"success": True})
  return flask.jsonify({"code": 403, "message": "Invalid credentials"})

@app.route("/getResumeDetails", methods=['GET'])
def parse_resume():
  if authenticate(flask.request.json):
    filename = flask.request.args.get('filename')
    did_user_opt_in = flask.request.args.get('optIn') == "true"
    is_development = flask.request.args.get("isDev") == "true"
    resume_as_dict = resume_to_dict(filename)
    scanned_data = ruleset.scan_resume(filename, resume_as_dict)
    save_resume_to_db(filename, did_user_opt_in, scanned_data, resume_as_dict, is_development)
    img_filename = pdf_to_png(filename)
    host = ""
    if is_development:
      host = "http://localhost:5000"
    else:
      host = "http://resume.sahilkapur.com/server"
    return flask.jsonify({
      "analysis": scanned_data,
      "resumeJSON": resume_as_dict,
      "resumeImageSrc": host+"/getResumeImage?filename="+img_filename,
      "success": True
    })
  return flask.jsonify({"code": 403, "message": "Invalid credentials"})

@app.route("/getResumeImage")
def get_resume_jpg():
  return flask.send_from_directory("saved-images/", flask.request.args.get("filename"))

def authenticate(data):
  return True

def save_resume_to_db(filename, did_user_opt_in, scanned_data, resume_as_json, is_development):
  entry = {
    "optIn": did_user_opt_in,
    "analysis": scanned_data,
    "resumeJSON": resume_as_json,
    "filename": filename,
    "isDev": is_development
  }
  db.add_entry(entry)

def pdf_to_png(filename):
  images = convert_from_path("saved-resumes/"+ filename,size = (300, None)) 
  img_filename = os.path.splitext(filename)[0]+".jpg"
  for img in images: 
    img.save("saved-images/"+ img_filename, 'JPEG')
  return img_filename


if __name__ == "__main__":
  app.run(debug=True)
