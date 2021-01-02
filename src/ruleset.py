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
    flag_1 = 0
    flag_2 = 0
    flag_3 = 0
    flag_4 = 0
    flag_5 = 0
    flag_6 = 0
    flag_7 = 0
    flag_8 = 0
    flag_9 = 0

    elements = []
    d = resume_to_dict(filename, path="saved-resumes/")

    if d.get("names") == None:
        flag_1 = flag_1 + 1
        print("You are missing your name!")                     #checks name
    
    if d.get("emails") == None:
        flag_2 = flag_2 + 1
        print("You are missing your email!")                    #checks email
    
    if d.get("phones") == None:
        flag_3 = flag_3 + 1
        print("You are missing your phone number!")             #checks phone number
    
    for add in d["links"]:
        if add.get("domain") == "linkedin.com":
            flag = flag + 1
    if flag == 0:
        print("You are missing your Linkedin account!")             #checks linkedin account 

    for edu in d["schools"]:
        if edu.get("degree") == None:
            flag_4 = flag_4 + 1
            print("You are missing your degree")                #checks degree
        if edu.get("gpa") == None:
            flag_5 = flag_5 + 1
            print("You are missing your GPA")                   #checks GPA

    for time in d["positions"]:                                 #checks dates 
        if time.get("isCurrent") != None:
            if time.get("start").get("year") == None:
                flag_6 = flag_6 + 1
                print("You are missing a start date year")
            if time.get("start").get("month") == None:
                flag_7 = flag_7 + 1
                print("You are missing a start date month")
        else:
            if time.get("start").get("year") == None:
                flag_6 = flag_6 + 1
                print("You are missing a start date year")
            if time.get("start").get("month") == None:
                flag_7 = flag_7 + 1
                print("You are missing a start date month")
            if time.get("end").get("year") == None:
                flag_8 = flag_8 + 1
                print("You are missing an end date year")
            if time.get("end").get("year") == None:
                flag_9 = flag_9 + 1
                print("You are missing an end date month")
    
    if flag == 0:
        elements.append("Linkedin")
    if flag_1 != 0:
        elements.append("Name")
    if flag_2 != 0:
        elements.append("Email")
    if flag_3 != 0:
        elements.append("Phone Number")
    if flag_4 != 0:
        elements.append("Degree")
    if flag_5 != 0:
        elements.append("GPA")
    if flag_6 != 0:
        elements.append("Start Year")
    if flag_7 != 0:
        elements.append("Start Month")
    if flag_8 != 0:
        elements.append("End Year")
    if flag_9 != 0:
        elements.append("End Month")
   

    return elements





    
    



