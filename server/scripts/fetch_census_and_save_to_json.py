import requests

# Fetch the data from the Census API
for year in range(2005, 2022):
    if year == 2020:
        continue
    response = requests.get('https://api.census.gov/data/2017/acs/acs5?get=NAME,B01001_001E,B01001_003E,B01001_004E,B01001_005E,B01001_006E,B01001_027E,B01001_028E,B01001_029E,B01001_030E,B01001B_001E,B01001I_001E,B15002_011E,B15002_028E&for=place')
    data = response.json()
    print(data)