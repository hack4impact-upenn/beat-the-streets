import express from 'express';
import {
  getAllCities,
  getCity,
  getIndicator,
  setCity,
  getIndicatorYearly,
} from '../controllers/city.controller';

const router = express.Router();

/**
 * A GET route to get all city objects
 */
router.get('/all', getAllCities);

/**
 * a GET route to get the city object with name ‘cityName'
 */
router.get('/:cityName', getCity);

/**
 * a PUT route to add a city object with name ‘cityName’
 */
router.put('/:cityName', setCity);

/**
 * A GET route to get data for one indicator across all cities for the most recent year
 */
router.get('/indicator/:indicatorName', getIndicator);

/**
 * A GET route to get data for one indicator across all cities for all years
 */
router.get('/indicatoryearly/:indicatorName', getIndicatorYearly);

export default router;
