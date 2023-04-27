import express from 'express';
import {
  getAllCities,
  getCity,
  getIndicator,
  setCity
  getIndicatorYearly,
} from '../controllers/city.controller';

const router = express.Router();

router.get('/all', getAllCities);

router.get('/:cityName', getCity);

router.put('/:cityName', setCity);


/**
 * A GET route to get city indicator data
 */
router.get('/indicator/:indicatorName', getIndicator);

router.get('/indicatoryearly/:indicatorName', getIndicatorYearly);

/*
isAuthenticated, isAdmin, getIndicator); 
 */
router.get('/indicator/:indicatorName', getIndicator); // isAuthenticated, isAdmin, getIndicator);

export default router;
