/**
 * All the controller functions containing the logic for routes relating to a
 * user's authentication such as login, logout, and registration.
 */
import express from 'express';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';

import { getAllCitiesFromDB, getCityFromDB } from '../services/city.service';

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

export { getAllCities, getCity };
