import { Router } from 'express';
import { proxyRouter } from './proxy';

const protectedRoutes = Router();

// Week 5: add JWT middleware here
// protectedRoutes.use(verifyJwt);


export { protectedRoutes };
