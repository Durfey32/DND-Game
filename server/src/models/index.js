import sequelize from "../config/connection.js";
import { initializeGame } from "./game.js";
import { initializeCharacter} from "./character.js";
import { initializePlayer } from "./players.js";

const Player = initializePlayer(sequelize);
const Game = initializeGame(sequelize);
const Character = initializeCharacter(sequelize);

Player.hasMany(Game, {foreignKey: 'player_id'});
Game.belongsTo(Player, {foreignKey: 'player_id', as: 'player'});

Game.hasMany(Character, {foreignKey: 'gameid'});
Character.belongsTo(Game, {foreignKey: 'gameid', as: 'game'});

export { Game, Character, Player };