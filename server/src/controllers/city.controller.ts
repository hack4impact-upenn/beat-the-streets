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
  updateCityInDB,
  // getCityObj,
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
          // console.log(cityArray[0]);
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
const setCity = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { city } = req.body;
  if (!city) {
    next(ApiError.missingFields(['city']));
    return;
  }
  updateCityInDB(city)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to update city.'));
    });
};
/**
 * Get all city indicator data from the database. Upon success, send the a list of all indicator data in the res body with 200 OK status code.
 */
const getIndicator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  // eslint-disable-next-line consistent-return
) => {
  const { indicatorName } = req.params;

  if (!indicatorName) {
    return next(ApiError.missingFields(['status']));
  }

  try {
    const cities = await getAllCitiesFromDB();
    const myindicators = new Map();

    cities.forEach((city) => {
      const indicatorValue = city.indicators.get(indicatorName);

      if (indicatorValue !== undefined) {
        myindicators.set(city.cityName, indicatorValue);
      }
    });

    const finalValues: number[] = [];

    myindicators.forEach((allYearValues) => {
      const sortedYears = Array.from(allYearValues.keys() as number[]).sort(
        (a, b) => b - a,
      );
      let recentNonZeroYear: number | undefined;

      // eslint-disable-next-line no-restricted-syntax
      for (const year of sortedYears) {
        if (allYearValues.get(year) !== 0) {
          recentNonZeroYear = year;
          break;
        }
      }

      if (recentNonZeroYear !== undefined) {
        const lastYearVal = allYearValues.get(recentNonZeroYear) as number;
        finalValues.push(lastYearVal);
      }
    });

    return res.status(StatusCode.OK).send(finalValues);
  } catch (err) {
    next(ApiError.internal('Unable to fetch indicators.'));
  }
};

/**
 * Get all city indicator data from the database. Upon success, send the a list of all indicator data in the res body with 200 OK status code.
 */
const getIndicatorYearly = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { indicatorName } = req.params;
  if (!indicatorName) {
    next(ApiError.missingFields(['status']));
  }

  const cities = await getAllCitiesFromDB();

  const cityIndicators = new Map(); // The indicator for each city

  cities.forEach(function (city) {
    const allIndicators = city.indicators;
    Array.from(allIndicators.keys()).forEach(function (k) {
      if (k === indicatorName) {
        if (!(allIndicators.get(k) === undefined)) {
          cityIndicators.set(city.cityName, allIndicators.get(k));
        }
      }
    });
  });
  console.log(cityIndicators);

  const indicatorResult = new Map();

  Array.from(cityIndicators.keys()).forEach(function (j) {
    const allYearValues = cityIndicators.get(j);
    Array.from(allYearValues.keys()).forEach(function (yr) {
      let total = indicatorResult.get(yr);
      if (total === undefined) {
        total = 0;
      }
      indicatorResult.set(yr, total + allYearValues.get(yr));
    });
  });

  console.log(indicatorResult);

  try {
    res.status(StatusCode.OK).send(Object.fromEntries(indicatorResult));
  } catch (err) {
    next(ApiError.internal('Unable to fetch indicators.'));
  }
};

export { getAllCities, getCity, getIndicator, setCity, getIndicatorYearly };
