import sequelize from "../config/connection";
import { initializeGame, Game } from "./game";
import { initializeCharacter, character } from "./character";
import { initializePlayer, Player } from "./player";

initializePlayer(sequelize);
initializeGame(sequelize);
initializeCharacter(sequelize);

Player.hasMany(Game, {foreignKey: 'player_id'});
Game.belongsTo(Player, {foreignKey: 'player_id', as: 'player'});

Game.hasMany(Character, {foreignKey: 'game_id'});
Character.belongsTo(Game, {foreignKey: 'game_id', as: 'game'});

export { Game, Character, Player };