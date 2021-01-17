const copy = {
  "Prechecks": {
    "isFilePDF": {
      "true": {
        "title": "Your file format is perfect!",
        "subtitle": "PDF documents are the standard for submitting resumes."
      },
      "false": {
        "title": "Wrong file format.",
        "subtitle": "Use a PDF document format for your resume."
      },
    },
    "isFileScannable": {
      "true": {
        "title": "Your resume scans!",
        "subtitle": "Employers are able to parse your resume. Please check the formatting tab to ensure data is being read correctly."
      },
      "false": {
        "title": "Error scanning resume.",
        "subtitle": "Please double check the contents of your resume before scanning."
      },
    },
    "doesFollowNaming": {
      "true": {
        "title": "Your resume is titled appropriately.",
        "subtitle": "Great work using the 'FirstName_LastName_Resume.pdf' format!"
      },
      "false": {
        "title": "Please use standard resume naming conventions.",
        "subtitle": "Rename your resume as 'FirstName_LastName_Resume.pdf'"
      },
    },
    "isAPage": {
      "true": {
        "title": "Resume length is one page.",
        "subtitle": "Your resume fits on a single page - just as recruiters want it."
      },
      "false": {
        "title": "Resume is more than one page.",
        "subtitle": "Try to cut your resume down to one page."
      }
    }
  },
  "Required Info": {
    "degree": {
      "true": {
        "title": "Your degree was listed and found.",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "Your degree has not been found.",
        "subtitle": "Please ensure your degree information is listed properly."
      }
    },
    "emails": {
      "true": {
        "title": "Your email was listed and found.",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "Your email has not been found.",
        "subtitle": "Please confirm your email is added to your resume."
      }
    },
    "endMonth": {
      "true": {
        "title": "All position end months were listed and found.",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "One or more position end months have not been found.",
        "subtitle": "Please confirm all positions include an end month."
      }
    },
    "endYear": {
      "true": {
        "title": "All position end years were listed and found.",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "One or more position end years have not been found.",
        "subtitle": "Please confirm all positions include an end year."
      }
    },
    "gpa": {
      "true": {
        "title": "Your GPA was listed and found",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "Your GPA has not been found.",
        "subtitle": "Add you GPA to your resume if it is above 3.00."
      }
    },
    "linkedin": {
      "true": {
        "title": "Your Linkedin profile link was listed and found",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "Your Linkedin profile link has not been found.",
        "subtitle": "Add your Linkedin profile link to give employers digital context."
      }
    },
    "name": {
      "true": {
        "title": "Your name was listed and found",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "Your name has not been found.",
        "subtitle": "Please confirm your first and last name is added."
      }
    },
    "phoneNumber": {
      "true": {
        "title": "Your phone number was listed and found.",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "Your phone number has not been found.",
        "subtitle": "Please confirm your phone number has been listed."
      }
    },
    "startMonth": {
      "true": {
        "title": "All position start months were listed and found.",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "One or more position start months have not been found.",
        "subtitle": "Please confirm all positions include a start month."
      }
    },
    "startYear": {
      "true": {
        "title": "All position start years were listed and found.",
        "subtitle": "Good work including essential information."
      },
      "false": {
        "title": "One or more position start years have not been found.",
        "subtitle": "Please confirm all positions include a start year."
      }
    }
  }
}

export default copy;