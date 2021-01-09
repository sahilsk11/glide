from resume_converter import resume_to_str
import prechecks
import ruleset
import json
import PyPDF2
from PyPDF2 import PdfFileReader 
import re
import collections
import experience_valuation


def scan_resume(filename, resume_as_dict):
    checklist_dict = ruleset.checklist(filename, resume_as_dict)
    is_pdf = prechecks.is_resume_pdf(filename)
    is_scannable = prechecks.is_resume_scannable(filename)
    good_verbs_list = ruleset.verb_usage(filename, resume_as_dict)
    follow_naming = prechecks.is_filename_formatting(filename)
    number_pages = prechecks.is_resume_a_page(filename)
    exp_valuation = experience_valuation.evaluate_all_experiences(resume_as_dict)
    skill_valuation = experience_valuation.evaluate_summary_skills(resume_as_dict)
    #points = calculate_points(checklist_list, is_pdf, is_scannable,filename_formatting)
    return {
        "prechecks": {
            "isFilePDF": is_pdf,
            "isFileScannable": is_scannable,
            "doesFollowNaming": follow_naming,
            "isAPage": number_pages
        },
        "requiredInfo": checklist_dict,
        #"points": points,
        "goodVerbs": good_verbs_list,
        "experience": {
            "skills": skill_valuation,
            "positions": exp_valuation # [{report}, ....]
        }
    }



def calculate_overall_points(precheck_score, ruleset_score):

    overall_points = 0

    

    return points