import flask
import os
import ruleset
import PyPDF2
from pdf2image import convert_from_path 

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
    scanned_data = ruleset.scan_resume(filename)
    return flask.jsonify(scanned_data)
  return flask.jsonify({"code": 403, "message": "Invalid credentials"})

def authenticate(data):
  return True

def pdf_to_png(filename):
  images = convert_from_path("saved-resumes/"+ filename) 
  
  for img in images: 
    img.save("saved-images/"+ os.path.splitext(filename)[0] + ".jpg", 'JPEG')
    

if __name__ == "__main__":
  app.run(debug=True)