import requests
import json

# Fetch the data from the Census API
save_data = {}
for year in range(2005, 2022):
    if year == 2020:
        continue
    response = requests.get(f"https://api.census.gov/data/2005/acs/acs1?get=NAME,B01001_001E,B01001_003E,B01001_004E,B01001_005E,B01001_006E,B01001_027E,B01001_028E,B01001_029E,B01001_030E,B01001B_001E,B01001I_001E,B15002_011E,B15002_028E&in=state:*&for=place:*")
    try:
        data = response.json()
    except:
        print(response)
        exit(0)

    verifiedCities = ['new york city', 'philadelphia', 'chicago', 'los Angeles city', 'baltimore', 'district', 'cleveland', 
            'lancaster', 'boston', 'san francisco'] 
    unverifiedCities = ['phoenix', 'st. louis', 'detroit', 'atlanta', 'austin', 'tampa', 'las vegas city',
                        'minneapolis', 'portland', 'indianapolis', 'houston', 'dallas', 'miami city']
    labels = data[0]
    formatted_data = []
    for row in data[1:]:
        # if a verified or unverified city is substring of row[0], add to formatted_data
        if any([city in row[0].lower() for city in verifiedCities]) or any([city in row[0].lower() for city in unverifiedCities]):
            formatted_data.append((f"{row[0]}", dict(zip(labels[:], row[:]))))
        
    # data = dict([(f"{row[-2]}-{row[-1]}", dict(zip(labels[:], row[:]))) for row in data[1:]])
    # pop_indicators = ['B01001_003E', 'B01001_004E', 'B01001_005E', 'B01001_006E', 'B01001_027E', 'B01001_028E', 'B01001_029E', 'B01001_030E']
    # for county in data:
    #     data[county]['pop_under_18_percent'] = sum([int(data[county][indicator]) for indicator in pop_indicators]) / float(data[county]['B01001_001E']) * 100
    # remove pop indicators from data
    # data = {county: {indicator: data[county][indicator] for indicator in data[county] if indicator not in pop_indicators} for county in data}
    
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
