
import requests
import pandas as pd
import os


import requests

# Your app's username and password for Basic Auth
username = os.getenv("RAVELY_USERNAME")
password = os.getenv("RAVELY_PASSWORD")

# Base URL and endpoint
base_url = "https://api.ravelry.com"
endpoint = "/patterns/search.json"


# Make the GET request with Basic Auth
filters = "craft=crochet&availability=ravelry%2Bfree&query=hat&sort=best"
response = requests.get(f"{base_url}{endpoint}?{filters}", auth=(username, password), params=params)

# Check the response
if response.status_code == 200:
    data = response.json()
    for source in data.get("pattern_sources", []):
        print(f"Name: {source['name']}")
        print(f"ID: {source['id']}")
        print(f"Permalink: {source['permalink']}")
        pattern_id = source['id']

        # get pattern details
        details_endpoint = f"/patterns/{pattern_id}.json"
        details_response = requests.get(f"{base_url}{details_endpoint}", auth=(username, password))
        if details_response.status_code == 200:
            pattern_details = details_response.json()
            pattern_download = pattern_details['pattern']['download_location']['url']
            print(f"Details for Pattern ID {pattern_id}: {pattern_details}")
        else:
            print(f"Error fetching details for Pattern ID {pattern_id}: {details_response.status_code}, {details_response.text}")
