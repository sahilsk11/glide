import flask
import os
from overall_points import scan_resume
import PyPDF2
from pdf2image import convert_from_path 
import db_connection as db
from resume_converter import resume_to_dict
import string
import random
import re
import sys
import traceback
import logging

if '/usr/bin' not in os.environ:
  os.environ['PATH'] = '/usr/bin'

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
    glide_rename_index = 0 #value to put in filename
    new_filename = file.filename
    while os.path.exists("saved-resumes/"+new_filename):
      print("file found")
      new_filename = new_filename.replace(".", "[GLIDE_"+str(glide_rename_index)+"].")
      glide_rename_index += 1
    file.save(os.path.join("saved-resumes/",new_filename))
    size = os.stat('saved-resumes/'+new_filename).st_size
    if (size > 1048576):
      os.remove("saved-resumes/"+new_filename)
      return flask.jsonify({"code": 400, "message": "File rejected - too big"})
    return flask.jsonify({"success": True, "filename": new_filename})
  return flask.jsonify({"code": 403, "message": "Invalid credentials"})

@app.route("/getResumeDetails", methods=['GET'])
def parse_resume():
  if authenticate(flask.request.json):
    filename = flask.request.args.get('filename')
    did_user_opt_in = flask.request.args.get('optIn') == "true"
    is_development = flask.request.args.get("isDev") == "true"
    try:
      resume_as_dict = resume_to_dict(filename)
      original_filename = remove_glide_index(filename)
      scanned_data = scan_resume(original_filename, resume_as_dict)
      new_filename = generate_filename(filename)
      rename_file(filename, new_filename)
    except Exception as e:
      logging.exception(e)
      return flask.jsonify({"success": False, "message": "There was an error in the request"})
    save_resume_to_db(
      original_filename,
      new_filename,
      did_user_opt_in,
      scanned_data,
      resume_as_dict,
      is_development
    )
    img_filename = pdf_to_png(new_filename)
    host = ""
    if is_development:
      host = "http://localhost:5000"
    else:
      host = "https://glidecv.com/server"
    return flask.jsonify({
      "analysis": scanned_data,
      "resumeJSON": resume_as_dict,
      "resumeImageSrc": host+"/getResumeImage?filename="+img_filename,
      "filename": original_filename,
      "success": True
    })
  return flask.jsonify({"code": 403, "message": "Invalid credentials"})

@app.route("/getResumeImage")
def get_resume_jpg():
  return flask.send_from_directory("saved-images/", flask.request.args.get("filename"))

@app.route("/countDocuments")
def count_documents():
  return flask.jsonify({"numDocuments": db.count_documents()})

def authenticate(data):
  return True

def save_resume_to_db(filename, new_filename, did_user_opt_in, scanned_data, resume_as_json, is_development):
  entry = {
    "optIn": did_user_opt_in,
    "analysis": scanned_data,
    "resumeJSON": resume_as_json,
    "original_filename": filename,
    "saved_filename": new_filename,
    "isDev": is_development
  }
  db.add_entry(entry)

def pdf_to_png(filename):
  images = convert_from_path("saved-resumes/"+ filename,size = (300, None)) 
  img_filename = os.path.splitext(filename)[0]+".jpg"
  for img in images: 
    img.save("saved-images/"+ img_filename, 'JPEG')
  return img_filename

def remove_glide_index(filename):
  if re.search("\[GLIDE_[0-9]+\]", filename) != None:
    return re.sub("\[GLIDE_[0-9]+\]", "", filename)
  else:
    return filename

def generate_filename(filename):
  original_extension = filename[filename.find("."):]
  letters = string.ascii_uppercase
  nums = string.digits
  out = ""
  for i in range(10):
    if i % 2:
      out += random.choice(letters)
    else:
      out += random.choice(nums)
  out += original_extension
  if os.path.exists("saved-resumes/"+out):
    out = generate_filename(filename)
  return out

def rename_file(original_filename, new_filename):
  os.replace("saved-resumes/"+original_filename, "saved-resumes/"+new_filename)


if __name__ == "__main__":
  app.run(debug=True)
