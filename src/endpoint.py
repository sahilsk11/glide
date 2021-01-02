import flask
import os
import ruleset
import PyPDF2
from PIL import Image

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
  if __name__ == '__main__':
    input1 = PyPDF2.PdfFileReader(open(filename, "rb"))
    page0 = input1.getPage(0)
    xObject = page0['/Resources']['/XObject'].getObject()

    for obj in xObject:
      if xObject[obj]['/Filter'] == '/DCTDecode':
        img = open(obj[1:] + ".jpg", "wb")
        img.write(data)
        img.save(filename + ".thumbnail", "JPEG")
        img.close()

if __name__ == "__main__":
  app.run(debug=True)