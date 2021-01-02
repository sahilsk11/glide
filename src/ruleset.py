from resume_converter import resume_to_dict
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

def scannable(filename):

    
def scan_resume(filename):
    missing_elements = checklist(filename)
    is_pdf = is_resume_pdf(filename)
    is_scannable = False
    points = calculate_points(missing_elemnts, is_pdf, is_scannable)
    return {
        "missingElements": missing_elements,
        "isFilePDF": is_pdf
    }

def calculate_points(missing_elements, is_pdf):
    points = 100
    points -= len(missing_elements)
    if not is_pdf:
        points -= 5
    return points


def checklist(filename):
    flag = 0

    elements = []
    d = resume_to_dict(filename, path="saved-resumes/")

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








    
    



