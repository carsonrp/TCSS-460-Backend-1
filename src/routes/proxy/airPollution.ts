import { Router } from 'express';
import { getAirPollution } from '../../controllers/proxy/airPollutionController';
import { requireEnvVar } from '../../middleware/validation';

const router = Router();

router.use(requireEnvVar('WEATHER_API_KEY'));

router.get('/air', getAirPollution);

export { router as airPollutionRouter };
