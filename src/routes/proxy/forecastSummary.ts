import { Router } from 'express';
import { getForecastSummary } from '../../controllers/proxy/forecastSummaryController';
import { requireEnvVar, requireCityQuery } from '../../middleware/validation';

const router = Router();

router.use(requireEnvVar('WEATHER_API_KEY'));

router.get('/forecast-summary', requireCityQuery, getForecastSummary);

export { router as forecastSummaryRouter };
