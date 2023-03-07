import { ICity, City } from '../models/city.model';

/**
 * @returns All the {@link City}s in the database
 */
const getAllCitiesFromDB = async () => {
  const cities = await City.find({}).exec();
  return cities;
};

/**
 * @returns A a specific {@link City} in the database based on the city name
 */
const getCityFromDB = async (name: string) => {
  const city = await City.find({ cityName: name }).exec();
  return city;
};

async function getCityObj(cityId: string) {
  const resultantCity = await City.findById(cityId);
  // const resultantAnswer = fakeData;
  const cityObj = {
    _id: resultantCity?._id,
    cityName: resultantCity?.cityName,
    isAccredited: resultantCity?.isAccredited,
    indicators: resultantCity?.indicators,
  } as ICity;
  return cityObj;
}

export { getAllCitiesFromDB, getCityObj, getCityFromDB };
