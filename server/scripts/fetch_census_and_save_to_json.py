import requests
import json

# Fetch the data from the Census API
save_data = {}
for year in range(2005, 2022):
    if year == 2020:
        continue
    response = requests.get(f"https://api.census.gov/data/{year}/acs/acs1?get=NAME,B01001_001E,B01001_003E,B01001_004E,B01001_005E,B01001_006E,B01001_027E,B01001_028E,B01001_029E,B01001_030E,B01001B_001E,B01001I_001E,B15002_011E,B15002_028E&in=state:*&for=place:*")
    try:
        data = response.json()
    except:
        print(response)
        exit(0)

    verifiedCities = ['new york city', 'philadelphia', 'chicago', 'los angeles city', 'baltimore', 'district', 'cleveland', 
            'lancaster', 'boston', 'san francisco'] 
    unverifiedCities = ['phoenix', 'st. louis', 'detroit', 'atlanta', 'austin', 'tampa', 'las vegas city',
                        'minneapolis', 'portland', 'indianapolis', 'houston', 'dallas', 'miami city']
    labels = data[0]
    formatted_data = {}
    for row in data[1:]:
        # if a verified or unverified city is substring of row[0], add to formatted_data
        if any([city in row[0].lower() for city in verifiedCities]) or any([city in row[0].lower() for city in unverifiedCities]):
            if 'north las vegas' in row[0].lower():
                continue
            cur_attributes = {}
            
            cur_attributes['population'] = int(row[labels.index('B01001_001E')])
            
            cur_attributes['under18s'] = sum([int(row[labels.index(indicator)]) for indicator in ['B01001_003E', 'B01001_004E', 'B01001_005E', 'B01001_006E', 'B01001_027E', 'B01001_028E', 'B01001_029E', 'B01001_030E']])
            
            if row[labels.index('B01001B_001E')]:
                cur_attributes['black_or_african_american'] = int(row[labels.index('B01001B_001E')])
            else:
                cur_attributes['black_or_african_american'] = None

            if row[labels.index('B01001I_001E')]:
                cur_attributes['hispanic_or_latino'] = int(row[labels.index('B01001I_001E')])
            else:
                cur_attributes['hispanic_or_latino'] = None
                
            if row[labels.index('B15002_011E')] and row[labels.index('B15002_028E')]:
                cur_attributes['high_school_graduates'] = (int(row[labels.index('B15002_011E')]) + int(row[labels.index('B15002_028E')]))
            else:
                cur_attributes['high_school_graduates'] = None
                
            formatted_data[f"{row[0]}"] = cur_attributes
    
    save_data[str(year)] = formatted_data

final_data = []
cities = save_data['2005'].keys()
for city in cities:
    cur_city = {}
    cur_city['cityName'] = city
    cur_attributes['isAccredited'] = any([cur_city in city for cur_city in verifiedCities])
    indicators = {}
    for year in range(2005, 2022):
        if year == 2020:
            continue
        for indicator in save_data[str(year)][city]:
            if indicator not in indicators:
                indicators[indicator] = {}
            indicators[indicator][str(year)] = save_data[str(year)][city][indicator]
    cur_city['indicators'] = indicators
    final_data.append(cur_city)

with open("data.json", "w") as file:
    json.dump(final_data, file, indent=4)

"""
SCHEMA FOR MONGO CONSENSUS DATA:
[
	"City Name" : {
		"isAccredited" : true,
		"indicators" : {
			"IndicatorName1" : {
				"2010" : Value
				"2011" : Value
				"2012" : Value
				"2013" : Value
				"2014" : Value
				"2015" : Value
			}
			"IndicatorName2" : {
				"2010" : Value
				"2011" : Value
				"2012" : Value
				"2013" : Value
				"2014" : Value
				"2015" : Value
			}
		}
	}
]
"""
