from resume_converter import get_cleaned_resume_text, resume_to_dict
import json 
import ruleset
import endpoint


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
  resume_name = "Sameer_Kapur_Resume.pdf"
  #s = get_cleaned_resume_text(resume_name)
  #print(d)
  d = resume_to_dict(resume_name)
  print(ruleset.checklist(resume_name,d))
  print(ruleset.scan_resume(resume_name, d))
  #print(s)

  
  
