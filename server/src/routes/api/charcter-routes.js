import express from 'express';
import { generateCharacter } from '../../controllers/characterController.js';

const characterRoutes = express.Router();
characterRoutes.post('/generate-character', generateCharacter);

export {characterRoutes as characterRoutes};