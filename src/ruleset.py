from resume_converter import resume_to_dict
import json

"""
Top level function that will be called from API endpoint.
Performs all checks on resume and returns a single dictionary
that will be sent as JSON to frontend
"""
def scan_resume(filename):
    missing_elements = checklist(filename)
    return {
        "missingElements": missing_elements
    }

def checklist(filename):
    flag = 0

    elements = []
    d = resume_to_dict(filename, path="saved-resumes/")

    if d.get("names") == None:
        elements.append("Name")                     #checks name
    
    if d.get("emails") == None:
        elements.append("Email")                    #checks email
    
    if d.get("phones") == None:
        elements.append("Phone Number")             #checks phone number
    
    for add in d["links"]:
        if add.get("domain") == "linkedin.com":
            flag = flag + 1
    if flag == 0:
        elements.append("Linkedin")            #checks linkedin account 

    for edu in d["schools"]:
        if edu.get("degree") == None:
            elements.append("Degree")               #checks degree
        if edu.get("gpa") == None:
            elements.append("GPA")                  #checks GPA

    for time in d["positions"]:                                 #checks dates 
        if time.get("isCurrent") != None:
            if time.get("start").get("year") == None:
                elements.append("Start Year")
            if time.get("start").get("month") == None:
                elements.append("Start Month")
        else:
            if time.get("start").get("year") == None:
                elements.append("Start Year")
            if time.get("start").get("month") == None:
                elements.append("Start Month")
            if time.get("end").get("year") == None:
                elements.append("End Year")
            if time.get("end").get("month") == None:
                elements.append("End Month")
    
    return elements





    
    



