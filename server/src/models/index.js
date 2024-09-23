import sequelize from "../config/connection";
import { initializeGame, Game } from "./game";
import { initializeCharacter, Character } from "./character";
import { initializePlayer, Player } from "./players";

    const Player = initializePlayer(sequelize);
    const Game = initializeGame(sequelize);
    const Character = initializeCharacter(sequelize);

Player.hasMany(Game, {foreignKey: 'player_id'});
Game.belongsTo(Player, {foreignKey: 'player_id', as: 'player'});

Game.hasMany(Character, {foreignKey: 'game_id'});
Character.belongsTo(Game, {foreignKey: 'game_id', as: 'game'});

export { Game, Character, Player };