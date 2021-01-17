from resume_converter import resume_to_str, resume_to_dict
import prechecks
import json
import PyPDF2
from PyPDF2 import PdfFileReader 
import re
import collections
import experience_valuation

"""
Top level function that will be called from API endpoint.
Performs all checks on resume and returns a single dictionary
that will be sent as JSON to frontend
"""

def checklist(filename, resume_as_dict):
    flag = 0

    d = resume_as_dict
    response = {}

    response["name"] = not(d.get("names") == None)  # checks name

    response["emails"] = not(d.get("emails") == None)  # checks email

    response["phoneNumber"] = not(d.get("phones") == None)  # checks phone number

    if d.get("links") != None:
        for add in d["links"]:
            if add.get("domain") == "linkedin.com":
                flag = flag + 1
        if flag == 0:
            response["linkedin"] = False  # checks linkedin account
        else:
            response["linkedin"] = True
    else:
        response["linkedin"] = False

    if d.get("schools") != None:
        response["schools"] = {}
        for edu in d["schools"]:
            if edu.get("org") != None:
                response["schools"][edu.get("org")] = {}
                if edu.get("degree") == None:
                    response["schools"][edu.get("org")]["degree"] = False  # checks degree
                else:
                    response["schools"][edu.get("org")]["degree"] = True

                if edu.get("gpa") == None:
                    response["schools"][edu.get("org")]["gpa"] = False  # checks GPA
                else:
                    response["schools"][edu.get("org")]["gpa"] = True
    else:
        response["gpa"] = False
        response["degree"] = False


    if d.get("positions") != None:
        response["positions"] = {}
        for time in d["positions"]: 
            if time.get("org") != None:
                response["positions"][time.get("org")] = {}
                if time.get("isCurrent") != None:
                    if time.get("start") != None:
                        if time.get("start").get("year") == None:
                            response["positions"][time.get("org")]["startYear"] = False
                        else:
                            response["positions"][time.get("org")]["startYear"] = True
                        if time.get("start").get("month") == None:
                            response["positions"][time.get("org")]["startMonth"] = False   
                        else:
                            response["positions"][time.get("org")]["startMonth"] = True
                        response["positions"][time.get("org")]["endMonth"] = True
                        response["positions"][time.get("org")]["endYear"] = True
                    else:
                        response["startMonth"] = False
                        response["startYear"] = False
                        response["endMonth"] = True
                        response["endYear"] = True
                else:
                    if time.get("start") != None:
                        if time.get("start").get("year") == None:
                            response["positions"][time.get("org")]["startYear"] = False
                        else:
                            response["positions"][time.get("org")]["startYear"] = True
                        if time.get("start").get("month") == None:
                            response["positions"][time.get("org")]["startMonth"] = False
                        else:
                            response["positions"][time.get("org")]["startMonth"] = True
                    else:
                        response["startMonth"] = False
                        response["startYear"] = False

                    if time.get("end") != None:
                        if time.get("end").get("year") == None:
                            response["positions"][time.get("org")]["endYear"] = False
                        else:
                            response["positions"][time.get("org")]["endYear"] = True
                        if time.get("end").get("month") == None:
                            response["positions"][time.get("org")]["endMonth"] = False
                        else:
                            response["positions"][time.get("org")]["endMonth"] = True
                    else:
                        response["endMonth"] = False
                        response["endYear"] = False

    else:
        response["startMonth"] = False
        response["startYear"] = False
        response["endMonth"] = False
        response["endYear"] = False

    return response


def verb_usage(filename, resume_as_dict):
    position_dict = {}
    with open("resume_verbs.json") as jsonFile:
        jsonObject = json.load(jsonFile)

    if "positions" in resume_as_dict:
        for work_description in resume_as_dict["positions"]:
            if work_description.get("org") != None:
                position_dict[work_description.get("org")] = []
                if work_description.get("summary") != None:
                    string = work_description.get("summary")
                    string_strip = string.strip()
                    string_split = string_strip.split()
                    for verb in jsonObject["good"]:
                        for index in string_split:
                            if verb == index:
                             position_dict[work_description.get("org")].append(index)
                            
    return position_dict


def ruleset_score(checklist, verb_usage, resume_as_dict):
    ruleset_points = 100
    if checklist["name"] == False:
        ruleset_points = ruleset_points - 23
    if checklist["emails"] == False:
        ruleset_points = ruleset_points - 23
    if checklist["phoneNumber"] == False:
        ruleset_points = ruleset_points - 4
    if checklist["linkedin"] == False:
        ruleset_points = ruleset_points - 4

    if resume_as_dict.get("schools") != None:
        for school_name in resume_as_dict["schools"]:
            if school_name.get("org") != None:
                if checklist["schools"][school_name.get("org")]["degree"] == False:
                    ruleset_points = ruleset_points - 20
                if checklist["schools"][school_name.get("org")]["gpa"] == False:
                    ruleset_points = ruleset_points - 10
    else:
        if checklist["degree"] == False:
            ruleset_points = ruleset_points - 20
        if checklist["gpa"] == False:
            ruleset_points = ruleset_points - 10
    
    if resume_as_dict.get("positions") != None:
        for company_name in resume_as_dict["positions"]:
            if company_name.get("org") != None:
                if company_name.get("isCurrent") != None:
                    if company_name.get("start") != None:
                        if checklist["positions"][company_name.get("org")]["startYear"] == False:
                            ruleset_points = ruleset_points - 4
                        if checklist["positions"][company_name.get("org")]["startMonth"] == False:
                            ruleset_points - ruleset_points - 4
                    else:
                        if checklist["startYear"] == False:
                            ruleset_points = ruleset_points - 4
                        if checklist["startMonth"] == False:
                            ruleset_points = ruleset_points - 4
                else:
                    if company_name.get("start") != None:
                        if checklist["positions"][company_name.get("org")]["startYear"] == False:
                            ruleset_points = ruleset_points - 4
                        if checklist["positions"][company_name.get("org")]["startMonth"] == False:
                            ruleset_points - ruleset_points - 4
                    else:
                        if checklist["startYear"] == False:
                            ruleset_points = ruleset_points - 4
                        if checklist["startMonth"] == False:
                            ruleset_points = ruleset_points - 4
                    if company_name.get("end") != None:
                        if checklist["positions"][company_name.get("org")]["endYear"] == False:
                            ruleset_points = ruleset_points - 4
                        if checklist["positions"][company_name.get("org")]["endMonth"] == False:
                            ruleset_points = ruleset_points - 4
                    else:
                        if checklist["endYear"] == False:
                            ruleset_points = ruleset_points - 4
                        if checklist["endMonth"] == False:
                            ruleset_points = ruleset_points - 4
    else:
        if checklist["startYear"] == False:
            ruleset_points = ruleset_points - 4
        if checklist["startMonth"] == False:
            ruleset_points = ruleset_points - 4
        if checklist["endYear"] == False:
            ruleset_points = ruleset_points - 4
        if checklist["endMonth"] == False:
            ruleset_points = ruleset_points - 4
    
    return ruleset_points
    
if __name__ == "__main__":
    d = resume_to_dict("sahil_kapur_resume.pdf")
    c = checklist("sahil_kapur_resume.pdf", d)
    v = verb_usage("sahil_kapur_resume.pdf", d)
    print(c)
    ruleset_score(c, v, d)
