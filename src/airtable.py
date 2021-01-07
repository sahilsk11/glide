import passwords
import requests

"""
Get all of the rows of a table in tuples
"""
def get_rows(table_name):
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
  return out

def is_table_valid(table_name):
  valid_table_names = ['skills', 'companies']
  if table_name not in valid_table_names:
    print("invalid table name")
    return False
  return True

if __name__ == "__main__":
  print(get_rows("skills"))  # returns [('Java', 10), ('Python', 8)]
