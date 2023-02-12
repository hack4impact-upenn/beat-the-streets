import { City } from '../models/city.model';

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

export { getAllCitiesFromDB, getCityFromDB };
