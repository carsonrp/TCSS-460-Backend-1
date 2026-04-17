import { Router } from 'express';
import { v1Routes } from './v1';
import { v2Routes } from './v2';
import { protectedRoutes } from './protected';
import { airPollutionRouter } from './proxy/airPollution';
import { forecastSummaryRouter } from './proxy/forecastSummary';

const routes = Router();

// Mount your proxy routes
routes.use('/proxy', airPollutionRouter);
routes.use('/proxy', forecastSummaryRouter);

// Mount existing routes
routes.use('/v1', v1Routes);
routes.use('/v2', v2Routes);
routes.use(protectedRoutes);

export { routes };
