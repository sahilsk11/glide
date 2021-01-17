import passwords
import requests
import datetime

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

if __name__ == "__main__":
  print(get_rows("skills"))  # returns [('Java', 10), ('Python', 8)]
