import express from 'express';
import { getAllCities, getCity } from '../controllers/city.controller';

const router = express.Router();

router.get('/all', getAllCities);

router.get('/:cityName', getCity);

export default router;
