import { Router } from 'express';
import { charcterRoutes } from './charcter-routes.js';
import { gameRoutes } from './gameRoutes.js';

const router = Router();

router.use('/character', charcterRoutes);
router.use('/games', gameRoutes);

export default router;