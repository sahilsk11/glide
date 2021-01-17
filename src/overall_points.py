from resume_converter import resume_to_str, resume_to_dict
import prechecks
import ruleset
import verb_usage
import json
import PyPDF2
from PyPDF2 import PdfFileReader 
import re
import collections
import experience_valuation
import verb_usage
from operator import itemgetter
from pprint import pprint

def scan_resume(filename, resume_as_dict, system_filename=None):
    if system_filename is None:
        system_filename = filename
    checklist_dict = ruleset.checklist(filename, resume_as_dict)
    is_pdf = prechecks.is_resume_pdf(system_filename)
    is_scannable = prechecks.is_resume_scannable(system_filename)
    follow_naming = prechecks.is_filename_formatting(filename)
    number_pages = prechecks.is_resume_a_page(system_filename)
    good_verbs_list= verb_usage.good_verbs(filename,resume_as_dict)
    skills_list = experience_valuation.skills_single_experience(filename,resume_as_dict)
    exp_valuation = experience_valuation.evaluate_all_experiences(resume_as_dict,good_verbs_list,skills_list)
    skill_valuation = experience_valuation.evaluate_summary_skills(resume_as_dict)
    p_score = prechecks.precheck_score(is_pdf, is_scannable, number_pages, follow_naming)
    r_score = ruleset.ruleset_score(checklist_dict, verb_usage, resume_as_dict)
    v_score_dict = verb_usage.verb_score(good_verbs_list, resume_as_dict)
    e_score =  None
    agg_score = experience_valuation.get_agg_score(exp_valuation)
    summary_skill_list = experience_valuation.list_skills_found_summary(resume_as_dict)
    over_points = calculate_overall_points(p_score, r_score, v_score_dict, resume_as_dict, exp_valuation, skill_valuation )
    return {
        "prechecks": {
            "score": p_score,
            "isFilePDF": is_pdf,
            "isFileScannable": is_scannable,
            "doesFollowNaming": follow_naming,
            "isAPage": number_pages
        },
        "requiredInfo": {
            "score": r_score,
            "checklist": checklist_dict,
        },
        "experience": {
            "verbScore": v_score_dict,
            "skills": skill_valuation,
            "skillsList": summary_skill_list,
            "aggregateScore": agg_score,
            "positions": exp_valuation  # [{report}, ....]
        },
        "score": over_points
    }



def calculate_overall_points(precheck_score, ruleset_score, verb_scores, resume_as_dict, exp_valuation, skill_scores):
    flag = 0
    overall_points = 0
    v_score = 0
    

    pre_score = int(0.20 * precheck_score)
    rule_score = int(0.20 * ruleset_score)
    exp_score = 0
   
    weight = [0.6,0.3,0.1]
    top_positions = sorted(exp_valuation, key=itemgetter('score'), reverse=True)[:3] # top 3 scores sorted
    for i in range (len(top_positions)):
        exp_score += top_positions[i]["score"] * weight[i]

    eval_score = int(0.35 * exp_score)

    if "positions" in resume_as_dict:
        for summary in resume_as_dict["positions"]:
            flag = flag + 1
            v_score = v_score + verb_scores[summary.get("org")]
    
    if flag != 0:
        ve_score = int(0.10 * (v_score/flag))
    else:
        ve_score = 0

    skill_score = int(0.15 * skill_scores)

    overall_points = pre_score + rule_score + eval_score + ve_score + skill_score

    return int(overall_points)


if __name__ == "__main__":  #test
  filename = "sahil_kapur_resume.pdf"
  d = resume_to_dict(filename)
  #scan_resume(filename, d)
  a = prechecks.is_resume_pdf(filename)
  b = prechecks.is_resume_scannable(filename)
  c = prechecks.is_resume_a_page(filename)
  e = prechecks.is_filename_formatting(filename)
  f = ruleset.checklist(filename,d)
  g = ruleset.verb_usage(filename,d)
  i = verb_usage.good_verbs(filename,d)
  v = verb_usage.verb_score(i,d)
  s = experience_valuation.skills_single_experience(filename,d)
  x = verb_usage.good_verbs(filename,d)
  p = prechecks.precheck_score(a,b,c,e)
  r= ruleset.ruleset_score(f, g, d)
  e = experience_valuation.evaluate_all_experiences(d,x,s)
  pprint(scan_resume(filename,d))    
  print(calculate_overall_points(p, r, v, d, e))

