import { Router } from 'express';
import { characterRoutes } from './charcter-routes.js';
import { gameRoutes } from './game-routes.js';

const router = Router();

router.use('/character', characterRoutes);
router.use('/games', gameRoutes);

export default router;