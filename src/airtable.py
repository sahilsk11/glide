import passwords
import requests
import datetime
import json

cached_entries = {}

"""
Get all of the rows of a table in tuples
"""
def get_rows(table_name):
  if table_name in cached_entries and (datetime.datetime.now() - cached_entries[table_name]["timestamp"]).total_seconds()/60 < 5:
    return cached_entries[table_name]["data"]
  out = []
  if not is_table_valid(table_name):
    return out

  endpoint = f"https://api.airtable.com/v0/appnRGhHWnhI07kjp/{table_name}"
  r = requests.get(endpoint, headers={
    "Authorization": f"Bearer {passwords.airtable()}"
  })
  response = r.json()
  for row in response["records"]:
    if ("name" in row["fields"]):
      out.append((row["fields"]["name"], row["fields"]["score"]))
  cached_entries[table_name] = {}
  cached_entries[table_name]["data"] = out
  cached_entries[table_name]["timestamp"] = datetime.datetime.now()
  return out

def is_table_valid(table_name):
  valid_table_names = ['skills', 'companies', 'roles']
  if table_name not in valid_table_names:
    print("invalid table name - " + table_name)
    return False
  return True

def get_score_from_key(queried_key, table_name):
  key_value_tuples = get_rows(table_name)
  for (key, score) in key_value_tuples:
    if table_name == "roles" and key in queried_key.lower() or key in queried_key:
      return score
    elif table_name != "roles" and key.lower() in queried_key.lower():
      return score
  return None

def add_email(email):
  url = "https://api.mailerlite.com/api/v2/groups/105805303/subscribers"

  data = {
    'email': email,
  }
  payload = json.dumps(data)
  headers = {
    'content-type': "application/json",
    'x-mailerlite-apikey': passwords.mail_key()
  }

  response = requests.request("POST", url, data=payload, headers=headers)
  return response.status_code == 200

if __name__ == "__main__":
  print(add_email("email@kapurs.net"))
