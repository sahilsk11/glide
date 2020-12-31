from resume_converter import resume_to_dict
import json

def checklist(filename):
    flag = 0
    d = resume_to_dict(filename, path="saved-resumes/")
    #d = json.loads(j)

    if d.get("names") == None:
        print("You are missing your name!")                     #checks name
    
    if d.get("emails") == None:
        print("You are missing your email!")                    #checks email
    
    if d.get("phones") == None:
        print("You are missing your phone number!")             #checks phone number
    
    for add in d["links"]:
        if add.get("domain") == "linkedin.com":
            flag = flag + 1
    if flag == 0:
        print("You are missing your Linkedin account!")             #checks linkedin account 

    for edu in d["schools"]:
        if edu.get("degree") == None:
            print("You are missing your degree")                #checks degree
        if edu.get("gpa") == None:
            print("You are missing your GPA")                   #checks GPA

    for time in d["positions"]:                                 #checks dates 
        if time.get("isCurrent") != None:
            for begin in time["start"]:
                if begin.get("year") == None:
                    print("You are missing a start date year")
                if begin.get("month") == None:
                    print("You are missing a start date month")
        else:
            for block in time["start"]:
                if block.get("year") == None:
                    print("You are missing a start date year")
                if block.get("month") == None:
                    print("You are missing a start date month")
            for end in time["end"]:
                if end.get("year") == None:
                    print("You are missing an end date year")
                if end.get("month") == None:
                    print("You are missing an end date month")





    
    



