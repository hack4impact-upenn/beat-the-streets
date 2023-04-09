/**
 * All the controller functions containing the logic for routes relating to a
 * user's authentication such as login, logout, and registration.
 */
import express from 'express';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';

import {
  getAllCitiesFromDB,
  getCityFromDB,
  getCityObj,
} from '../services/city.service';

/**
 * Get all cities
 */
const getAllCities = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllCitiesFromDB()
      .then((cities) => {
        res.status(StatusCode.OK).send(cities);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all cities'));
      })
  );
};

/**
 * Get a specific city's ID
 */
const getCityNameByID = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { cityID } = req.params;
  console.log('here at city route');
  console.log(cityID);

  if (!cityID) {
    next(ApiError.internal('Request must include a valid cityID param'));
  }

  if (typeof cityID !== 'string') {
    next(ApiError.internal('Invalid cityName param'));
  }

  return (
    getCityObj(cityID)
      .then((cityObj) => {
        console.log(cityObj);
        res.status(StatusCode.OK).send(cityObj);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve specified city'));
      })
  );
};

/**
 * Get a specific city
 */
const getCity = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { cityName } = req.params;

  if (!cityName) {
    next(ApiError.internal('Request must include a valid cityName param'));
  }

  if (typeof cityName !== 'string') {
    next(ApiError.internal('Invalid cityName param'));
  }

  return (
    getCityFromDB(cityName)
      .then((cityArray) => {
        if (cityArray.length === 1) {
          res.status(StatusCode.OK).send(cityArray[0]);
        } else {
          next(ApiError.internal('Unable to retrieve specified city'));
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve specified city'));
      })
  );
};

/**
 * Get all city indicator data from the database. Upon success, send the a list of all indicator data in the res body with 200 OK status code.
 */
const getIndicator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { indicatorName } = req.params;
  if (!indicatorName) {
    next(ApiError.missingFields(['status']));
  }

  const cities = await getAllCitiesFromDB();

  const myindicators = new Map(); // indicator is a map of a map of numbers

  cities.forEach(function (city) {
    const allIndicators = city.indicators;
    // for (let k of allIndicators.keys()) {
    Array.from(allIndicators.keys()).forEach(function (k) {
      // console.log(city.cityName, allIndicators.get(k), k);
      if (k === indicatorName) {
        if (!(allIndicators.get(k) === undefined)) {
          myindicators.set(city.cityName, allIndicators.get(k));
        }
      }
    });
  });

  const finalValues: number[] = [];

  // for (let k of myindicators.keys()) {
  Array.from(myindicators.keys()).forEach(function (j) {
    const allYearValues = myindicators.get(j);
    // const lastYearVal = Array.from(allYearValues.values()).pop();

    let maxYear = 0;
    // for (let yr of Array.from(allYearValues.keys())) {
    //   if ((yr as number) > maxYear) {
    //     maxYear = yr as number;
    //   }
    // }
    Array.from(allYearValues.keys()).forEach(function (yr) {
      if ((yr as number) > maxYear) {
        maxYear = yr as number;
      }
    });
    const lastYearVal = allYearValues.get(maxYear) as number;

    finalValues.push(lastYearVal);
  });

  try {
    res.status(StatusCode.OK).send(finalValues);
  } catch (err) {
    next(ApiError.internal('Unable to fetch indicators.'));
  }
};

export { getAllCities, getCity, getIndicator, getCityNameByID };
