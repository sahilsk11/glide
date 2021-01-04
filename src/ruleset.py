from resume_converter import resume_to_str
import json
import PyPDF2

"""
Top level function that will be called from API endpoint.
Performs all checks on resume and returns a single dictionary
that will be sent as JSON to frontend
"""
def is_resume_pdf(filename):
    try:
        PyPDF2.PdfFileReader(open("saved-resumes/"+ filename, "rb"))
    except PyPDF2.utils.PdfReadError:
        return False
    else:
        return True

def is_resume_scannable(filename):
    string = resume_to_str(filename, path="saved-resumes/")
    if string == "":
        return False
    else:
        return True
    
def scan_resume(filename, resume_as_dict):
    missing_elements = checklist(filename, resume_as_dict)
    is_pdf = is_resume_pdf(filename)
    is_scannable = is_resume_scannable(filename)
    points = calculate_points(missing_elements, is_pdf, is_scannable)
    return {
        "missingElements": missing_elements,
        "isFilePDF": is_pdf,
        "isFileScannable": is_scannable,
        "points": points
    }

def calculate_points(missing_elements, is_pdf, is_scannable):
    
    points = 100
    for x in missing_elements:
        if x == "name":
            points = points - 10
        if x == "email":
            points = points - 10
        if x == "phoneNumber":
            points = points - 2
        if x == "linkedin":
            points = points - 2
        if x == "degree":
            points = points - 10
        if x == "gpa":
            points = points - 5
        if x == "startYear":
            points = points - 3
        if x == "startMonth":
            points = points - 3
        if x == "endYear":
            points = points - 3
        if x == "endMonth":
            points = points - 3

    if not is_pdf:
        points = points - 20
    if not is_scannable:
        points = points - 15
    
    return points


def checklist(filename, resume_as_dict):
    flag = 0

    elements = []
    d = resume_as_dict

    if d.get("names") == None:
        elements.append("name")                     #checks name
    
    if d.get("emails") == None:
        elements.append("email")                    #checks email
    
    if d.get("phones") == None:
        elements.append("phoneNumber")             #checks phone number
    
    for add in d["links"]:
        if add.get("domain") == "linkedin.com":
            flag = flag + 1
    if flag == 0:
        elements.append("linkedin")            #checks linkedin account 

    for edu in d["schools"]:
        if edu.get("degree") == None:
            elements.append("degree")               #checks degree
        if edu.get("gpa") == None:
            elements.append("gpa")                  #checks GPA

    for time in d["positions"]:                                 #checks dates 
        if time.get("isCurrent") != None:
            if time.get("start").get("year") == None:
                elements.append("startYear")
            if time.get("start").get("month") == None:
                elements.append("startMonth")
        else:
            if time.get("start").get("year") == None:
                elements.append("startYear")
            if time.get("start").get("month") == None:
                elements.append("startMonth")
            if time.get("end").get("year") == None:
                elements.append("endYear")
            if time.get("end").get("month") == None:
                elements.append("endMonth")
    
    return elements








    
    



