import express from 'express';
import { generateCharacter } from '../../controllers/characterController';

const charcterRoutes = express.Router();

charcterRoutes.post('/generate-character', generateCharacter);

export default charcterRoutes;