from resume_converter import get_cleaned_resume_text, resume_to_dict
import json 

def calculate_points(cleaned_text):
  f = open("points.json")
  data = json.load(f)
  points = 0
  for key in data:
    if cleaned_text.find(key) > 0:
      points += data[key]
  return points

def interpret_points(points):
  if points < 10:
    return "no internship for you"
  elif points < 20:
    return "aight, you got hope"
  return "you in homie"

if __name__ == "__main__":
  resume_text = get_cleaned_resume_text("sahil_kapur_resume.pdf")
  points = calculate_points(resume_text)
  print(interpret_points(points), "("+str(points)+" points)")
  print(resume_to_dict('sahil_kapur_resume.pdf'))