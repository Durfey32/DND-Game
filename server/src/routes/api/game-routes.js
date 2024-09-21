import express from 'express';
import { getAllGames, createGame, updateGame, deleteGame, askQuestion } from '../../controllers/gameController.js';

const gameRoutes = express.Router();

gameRoutes.get('/', getAllGames);

gameRoutes.post('/', createGame);

gameRoutes.put('/:id', updateGame);

gameRoutes.delete('/:id', deleteGame);

gameRoutes.post('/ask', askQuestion);

export { gameRoutes as gameRoutes};