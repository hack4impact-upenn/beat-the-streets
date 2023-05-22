import requests
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import pathlib
from datetime import datetime

# First we connect to the database

env_path = pathlib.Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

client = MongoClient(os.environ.get("ATLAS_URI"))
db = client["test"]
collection = db["cities"]

# Then we get the data from the census API

verified_cities = [
    'new york city', 'philadelphia', 'chicago', 'los angeles city',
    'baltimore', 'district', 'cleveland', 'lancaster', 'boston',
    'san francisco'
]
unverified_cities = [
    'phoenix', 'st. louis', 'detroit', 'atlanta', 'austin', 'tampa',
    'las vegas city', 'minneapolis', 'portland', 'indianapolis',
    'houston', 'dallas', 'miami city'
]

print("\n 📡 Fetching data from the census API...")
# We get the data for each year and store it in a dictionary
save_data = {}
current_year = datetime.now().year  # Get current year
for year in range(2005, current_year):
    response = requests.get(
        f"https://api.census.gov/data/{year}/acs/acs1?get=NAME,B17001_002E,B01001_001E,B01001_003E,B01001_004E,B01001_005E,B01001_006E,B01001_027E,B01001_028E,B01001_029E,B01001_030E,B01001B_001E,B01001I_001E,B15002_011E,B15002_028E,B15002_015E,B15002_032E,B01001A_001E,B01001C_001E,B01001D_001E,B01001E_001E,B01001G_001E&in=state:*&for=place:*"
    )

    if response.status_code == 404:  # Check if response status code is 404
        print(f"Data for the year {year} not found, skipping this year.")
        continue  # If 404, then skip this year

    try:
        data = response.json()
    except:
        print(response)
        exit(0)

    labels = data[0]
    formatted_data = {}
    for row in data[1:]:
        row_lower = row[0].lower()
        if any(city in row_lower for city in verified_cities) or any(city in row_lower for city in unverified_cities):
            if 'north las vegas' in row_lower:
                continue
            cur_attributes = {
                'population': int(row[labels.index('B01001_001E')]),
                'under18s': sum(int(row[labels.index(indicator)]) for indicator in [
                    'B01001_003E', 'B01001_004E', 'B01001_005E', 'B01001_006E',
                    'B01001_027E', 'B01001_028E', 'B01001_029E', 'B01001_030E'
                ]),
                'bachelor': sum(int(row[labels.index(indicator)]) for indicator in ['B15002_015E', 'B15002_032E']),
                'persons_in_poverty': int(row[labels.index('B17001_002E')]) if row[labels.index('B17001_002E')] is not None else None,
                'black_or_african_american': int(row[labels.index('B01001B_001E')]) if row[labels.index('B01001B_001E')] else None,
                'hispanic_or_latino': int(row[labels.index('B01001I_001E')]) if row[labels.index('B01001I_001E')] else None,
                'white': int(row[labels.index('B01001A_001E')]) if row[labels.index('B01001A_001E')] else None,
                'american_indian_alaskan_native': int(row[labels.index('B01001C_001E')]) if row[labels.index('B01001C_001E')] else None,
                'asian': int(row[labels.index('B01001D_001E')]) if row[labels.index('B01001D_001E')] else None,
                'native_hawaiian_pacific_islander': int(row[labels.index('B01001E_001E')]) if row[labels.index('B01001E_001E')] else None,
                'two_or_more': int(row[labels.index('B01001G_001E')]) if row[labels.index('B01001G_001E')] else None,
                'high_school_graduates': (int(row[labels.index('B15002_011E')]) + int(row[labels.index('B15002_028E')])) if row[labels.index('B15002_011E')] and row[labels.index('B15002_028E')] else None
            }

            formatted_data[row[0]] = cur_attributes

    save_data[str(year)] = formatted_data
    print(f"{year}: Completed")

final_data = []
cities = save_data['2005'].keys()

# Prepare a list of all possible indicators
all_possible_indicators = [
    'population', 'under18s', 'bachelor', 'persons_in_poverty', 
    'black_or_african_american', 'hispanic_or_latino', 'white',
    'american_indian_alaskan_native', 'asian', 
    'native_hawaiian_pacific_islander', 'two_or_more', 
    'high_school_graduates'
]

# Then we format the data to be stored in the database
for city in cities:
    
    cur_city = {'cityName': city, 'isAccredited': any(cur_city in city for cur_city in verified_cities)}
    indicators = {indicator: {} for indicator in all_possible_indicators}

    for year in range(2005, current_year):
        # If the year was skipped, set indicators to 0
        if not str(year) in save_data:
            for indicator in all_possible_indicators:
                indicators[indicator][str(year)] = 0
        else:
            for indicator, value in save_data[str(year)][city].items():
                indicators[indicator][str(year)] = value

    cur_city['indicators'] = indicators
    final_data.append(cur_city)

print("🧑‍💻 Succesfully formatted data")
# Then we update the database
for city_data in final_data:
    city_name = city_data["cityName"]
    update_query = {"cityName": city_name}
    
    # Update the cityName and isAccredited fields
    update_data = {
        "$set": {
            "cityName": city_data["cityName"],
            "isAccredited": city_data["isAccredited"]
        }
    }
    
    # Update the indicators one by one using the dot notation
    for indicator, years_data in city_data["indicators"].items():
        update_data["$set"][f"indicators.{indicator}"] = years_data
    
    # Update the document with the matching cityName or insert it if it doesn't exist
    collection.update_one(update_query, update_data, upsert=True)

print("✅ Update Complete ✅")