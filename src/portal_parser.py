import requests
from bs4 import BeautifulSoup
import re

def analyze_application_url(url):
  r = requests.get(url)
  site_html = r.text
  soup = BeautifulSoup(site_html, 'html.parser')
  site_text = soup.get_text().lower()
  return scan_for_keywords(site_text)

def scan_for_keywords(site_text):
  keywords = [
    "java",
    "javascript",
    "python",
    "c++",
    "node.js",
    "react.js",
    "perl",
    "scala",
    "go",
    "golang",
    "git"
  ]
  freq_table = {}
  site_word_list = re.split("\s+", site_text)
  for word in site_word_list:
    word = word.replace(",", "")
    word = word.strip()
    for keyword in keywords:
      if (not (keyword is "java" and "javascript" in word)) and keyword == word:
        if keyword not in freq_table:
          freq_table[keyword] = 0
        freq_table[keyword] += 1

  return freq_table

if __name__ == "__main__":
  url = "https://boards.greenhouse.io/github/jobs/2532438"
  freq = analyze_application_url(url)
  print(freq)
