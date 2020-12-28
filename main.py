from io import StringIO
import json

from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

def resume_to_str(filename):
  output_string = StringIO()
  with open(filename, 'rb') as in_file:
      parser = PDFParser(in_file)
      doc = PDFDocument(parser)
      rsrcmgr = PDFResourceManager()
      device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
      interpreter = PDFPageInterpreter(rsrcmgr, device)
      for page in PDFPage.create_pages(doc):
          interpreter.process_page(page)
  return output_string.getvalue()

def calculate_points(cleaned_text):
  f = open("points.json")
  data = json.load(f)
  points = 0
  for key in data:
    if cleaned_text.find(key) > 0:
      points += data[key]
  return points

def interpret_points(points):
  if points < 10:
    return "no internship for you"
  elif points < 20:
    return "aight, you got hope"
  return "you in homie"

raw_text = resume_to_str('sahil_kapur_resume.pdf')
cleaned_text = raw_text.replace("\n\n", "")
cleaned_text = cleaned_text.lower()
points = calculate_points(cleaned_text)
print(interpret_points(points), "("+str(points)+" points)")