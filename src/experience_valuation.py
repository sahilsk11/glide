from resume_converter import resume_to_dict
from verb_usage import good_verbs
import airtable
import pprint
import time
import threading
from operator import itemgetter

def evaluate_summary_skills(resume_as_dict):
  if "summary" in resume_as_dict and "skills" in resume_as_dict["summary"]: # perform checks for keys
    skills = resume_as_dict["summary"]["skills"]
  else:
    skills = ""

  skill_score = get_skill_score(skills)
  return skill_score

def list_skills_found_summary(resume_as_dict):
  summary_skills_list = []
  if "summary" in resume_as_dict and "skills" in resume_as_dict["summary"]: # perform checks for keys
    skills_exp = resume_as_dict["summary"]["skills"]
    keyword_point_tuples = airtable.get_rows("skills")
    for (skill, score) in keyword_point_tuples:
      if skill.lower() in skills_exp.lower():
        summary_skills_list.append(skill.lower())
  
  return summary_skills_list


def evaluate_all_experiences(resume_as_dict, pos_dict, skill_dict):
  valuations = []
  func_start = time.time()
  threads = []
  if resume_as_dict.get("positions") != None:
    for position_dict in resume_as_dict["positions"]:
      start = time.time()
      t = threading.Thread(target=evaluate_single_experience, args=(position_dict, pos_dict, skill_dict, valuations))
      t.start()
      threads.append(t)
      end = time.time()
      # print(f"finished one company in {end - start}s ...")
    for t in threads:
      t.join()
    func_end = time.time()
    # print(f"finished valuations in {func_end - func_start}s")
    valuations = sorted(valuations, key = lambda i: i['score'],reverse=True)
  return valuations


def evaluate_single_experience(postion_dict, pos_dict, skill_dict, valuations=None):
  
  company = postion_dict.get("org") or ""
  company_score = get_company_score(company)

  verb_list = pos_dict[company]

  skill_list = skill_dict[company]

  role = postion_dict.get("title") or ""
  role_score = get_role_score(role)

  summary = postion_dict.get("summary") or ""
  summary_score = get_summary_score(summary)


  experience = postion_dict.get("summary") or ""
   
  # define weights for each component
  company_weight = 0.2
  role_weight = 0.3
  summary_weight = 0.5
  score = (company_score * company_weight) + (role_score * role_weight) + (summary_score * summary_weight)
  
  
  # what else would we want to report?
  report = {
    #"overallScore" : overall_score,
    "score": score,
    "title": role,
    "org": company,
    "verbs": verb_list,
    "skills": skill_list,
    "summaryExperience": experience 
    # "reason": { # do NOT include these in production
    #   "company_score": company_score,
    #   "role_score": role_score,
    #   "summary_score": summary_score
    # }
  }

  if valuations is None:
    return report
  valuations.append(report)


def get_company_score(company_name):
  score = airtable.get_score_from_key(company_name, "companies") # checks equality between name and key
  default_score = 3
  if score is None:
    score = default_score
  return 10*score

def get_role_score(role_name):
  score = airtable.get_score_from_key(role_name, "roles") # checks equality between name and key
  default_score = 3
  if score is None:
    score = default_score
  return 10*score

def get_summary_score(experience_summary):
  total_score = 0
  keyword_point_tuples = airtable.get_rows("skills")
  for (skill, score) in keyword_point_tuples:
    if skill.lower() in experience_summary.lower():
      total_score += score
  if total_score > 20:
    total_score = 20
  return 5*total_score

def get_skill_score(skill_summary):
  skill_total_score = 0
  keyword_point_tuples = airtable.get_rows("skills")
  for (skill, score) in keyword_point_tuples:
    if skill.lower() in skill_summary.lower():
      skill_total_score += score
  return skill_total_score


def skills_single_experience(filename, resume_as_dict):

  skill_dict = {}

  if "positions" in resume_as_dict:
      for work_description in resume_as_dict["positions"]:
          if work_description.get("org") != None:
              skill_dict[work_description.get("org")] = []
              if work_description.get("summary") != None:
                  summary_exp = work_description.get("summary")
                  skill_point_tuples = airtable.get_rows("skills")
                  for (skill, score) in skill_point_tuples:
                    if skill.lower() in summary_exp.lower():
                        skill_dict[work_description.get("org")].append(skill.lower())
                            
  return skill_dict

def get_agg_score(exp_valuation):
  exp_score = 0
  weight = [0.6,0.3,0.1]
  top_positions = sorted(exp_valuation, key=itemgetter('score'), reverse=True)[:3] # top 3 scores sorted
  for i in range (len(top_positions)):
    exp_score += top_positions[i]["score"] * weight[i]

  return exp_score



if __name__ == "__main__":
  start = time.time()
  filename = "Sameer_Kapur_Resume.pdf"
  d = resume_to_dict(filename)
  end = time.time()
  p = good_verbs(filename,d)
  s = skills_single_experience(filename,d)
  #print(f"resume dict received in {end - start}s ...")
  x = evaluate_all_experiences(d,p,s)
  print(evaluate_all_experiences(d,p,s))
 
