from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
import requests
import json


def resume_to_str(filename, path="saved-resumes/"):
  output_string = StringIO()
  with open(path+filename, 'rb') as in_file:
      parser = PDFParser(in_file)
      doc = PDFDocument(parser)
      rsrcmgr = PDFResourceManager()
      device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
      interpreter = PDFPageInterpreter(rsrcmgr, device)
      for page in PDFPage.create_pages(doc):
          interpreter.process_page(page)
  return output_string.getvalue()

def get_cleaned_resume_text(filename):
  raw_text = resume_to_str(filename)
  cleaned_text = raw_text.replace("\n\n", "")
  return cleaned_text.lower()

def resume_to_dict(filename, path="saved-resumes/"):
  resume = open(path+filename, "rb")
  r = requests.post('https://jobs.lever.co/parseResume', files=dict(resume=resume))
  return r.json()