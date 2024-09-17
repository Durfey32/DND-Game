import { Router } from 'express';
import { playerRoutes } from './playerRoutes.js';
import { gameRoutes } from './gameRoutes.js';

const router = Router();

router.use('/players', playerRoutes);
router.use('/games', gameRoutes);

export default router;