import flask

app = flask.Flask(__name__)

@app.route("/")
def healthcheck():
  return flask.jsonify({"status": 200, "message": "application is running"})

@app.route("/postResume", methods=['POST'])
def accept_resume():
  if authenticate(flask.request.json):
    # save resume as file
    print(flask.request.files)
    # parse resume and get results
    return flask.jsonify({"success": True})
  return flask.jsonify({"code": 403, "message": "Invalid credentials"})

def authenticate(data):
  return True

if __name__ == "__main__":
  app.run(debug=True)