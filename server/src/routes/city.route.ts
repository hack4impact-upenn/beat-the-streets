import express from 'express';
import {
  getAllCities,
  getCity,
  getIndicator,
  getCityNameByID,
  getIndicatorYearly,
} from '../controllers/city.controller';

const router = express.Router();

router.get('/all', getAllCities);

router.get('/:cityName', getCity);

/**
 * A GET route to get city indicator data
 */
router.get('/indicator/:indicatorName', getIndicator);

router.get('/indicatoryearly/:indicatorName', getIndicatorYearly);

/*
isAuthenticated, isAdmin, getIndicator); 
 */
router.get('/indicator/:indicatorName', getIndicator); // isAuthenticated, isAdmin, getIndicator);

router.get('/cityName/:cityID', getCityNameByID);

export default router;
