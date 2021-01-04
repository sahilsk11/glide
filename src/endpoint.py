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
    resume_as_dict = resume_to_dict(filename)
    scanned_data = ruleset.scan_resume(filename, resume_as_dict)
    save_resume_to_db(filename, did_user_opt_in, scanned_data, resume_as_dict)
    return flask.jsonify(scanned_data)
  return flask.jsonify({"code": 403, "message": "Invalid credentials"})

def authenticate(data):
  return True

def save_resume_to_db(filename, did_user_opt_in, scanned_data, resume_as_json):
  entry = {
    "optIn": did_user_opt_in,
    "analysis": scanned_data,
    "resumeJSON": resume_as_json,
    "filename": filename
  }
  db.add_entry(entry)

def pdf_to_png(filename):
  images = convert_from_path("saved-resumes/"+ filename) 
  
  for img in images: 
    img.save("saved-images/"+ os.path.splitext(filename)[0] + ".jpg", 'JPEG')
    

if __name__ == "__main__":
  app.run(debug=True)