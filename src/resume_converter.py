from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
import requests
import json
import docxpy

def resume_to_str(filename, path="saved-resumes/"):
  dot_index = filename.index(".")
  extension = filename[dot_index:]
  if extension.lower() == ".pdf":
    return pdf_to_str(filename, path)
  return docxpy.process(path+filename)

def pdf_to_str(filename, path):
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
  try:
    return r.json()
  except json.JSONDecodeError:
    print("invalid JSON response: " + r.text)
    return {}
