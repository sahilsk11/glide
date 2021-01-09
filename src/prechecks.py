from resume_converter import resume_to_str
import json
import PyPDF2
from PyPDF2 import PdfFileReader 
import re


def is_resume_pdf(filename):
    try:
        PyPDF2.PdfFileReader(open("saved-resumes/" + filename, "rb"))
    except PyPDF2.utils.PdfReadError:
        return False
    else:
        return True
def is_resume_scannable(filename):
    string = resume_to_str(filename, path="saved-resumes/")
    return bool(string and string.strip())

def is_resume_a_page(filename):
    num_pages = PdfFileReader(open("saved-resumes/" + filename, "rb")).getNumPages() 
    if num_pages != 1:
        return False
    else:
        return True
def is_filename_formatting(filename):
    return re.match("[a-zA-Z]+_[a-zA-Z]+_(r|R)esume\.", filename) != None

def precheck_score(is_resume_pdf, is_resume_scannable, is_resume_a_page, is_file_formatting):
    precheck_points = 100
    if not is_resume_pdf:
        precheck_points = precheck_points - 35
    if not is_resume_scannable:
        precheck_points = precheck_points - 35
    if is_filename_formatting:
        precheck_points = precheck_points - 15
    if not is_resume_a_page:
        precheck_points = precheck_points - 15
    
    return precheck_points
    
