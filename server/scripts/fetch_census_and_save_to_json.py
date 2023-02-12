import requests
import json

# Fetch the data from the Census API
save_data = {}
for year in range(2005, 2022):
    if year == 2020:
        continue
    response = requests.get(f"https://api.census.gov/data/{year}/acs/acs1?get=NAME,B01001_001E,B01001_003E,B01001_004E,B01001_005E,B01001_006E,B01001_027E,B01001_028E,B01001_029E,B01001_030E,B01001B_001E,B01001I_001E,B15002_011E,B15002_028E&for=county:*")
    try:
        data = response.json()
    except:
        print(response)
        exit(0)
    labels = data[0]
    data = dict([(f"{row[-2]}-{row[-1]}", dict(zip(labels[:], row[:]))) for row in data[1:]])
    pop_indicators = ['B01001_003E', 'B01001_004E', 'B01001_005E', 'B01001_006E', 'B01001_027E', 'B01001_028E', 'B01001_029E', 'B01001_030E']
    for county in data:
        data[county]['pop_under_18_percent'] = sum([int(data[county][indicator]) for indicator in pop_indicators]) / float(data[county]['B01001_001E']) * 100
    save_data[str(year)] = data

with open("data.json", "w") as file:
    json.dump(save_data, file, indent=4)

"""
SCHEMA FOR MONGO CONSENSUS DATA:
{
    '2005': {
        "{state code}-{countycode}": {indicator : data, ind2: data2}, 
        "{state code}-{countycode}": {indicator : data, ind2: data2},
        ...
    },
    '2006': {
        "{state code}-{countycode}": {indicator : data, ind2: data2}, 
        "{state code}-{countycode}": {indicator : data, ind2: data2},
        ...
    },
    ...
}
"""
