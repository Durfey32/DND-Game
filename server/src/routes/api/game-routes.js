import express from 'express';
import { getAllGames, createGame, updateGame, deleteGame, askQuestion, test} from '../../controllers/gameController.js';

const gameRoutes = express.Router();

gameRoutes.get('/', getAllGames);

gameRoutes.post('/', createGame);

gameRoutes.put('/:id', updateGame);

gameRoutes.delete('/:id', deleteGame);

gameRoutes.post('/ask', askQuestion);

gameRoutes.post('/test', test);

gameRoutes.post('/requestForGame', requestForGame);

export { gameRoutes as gameRoutes};