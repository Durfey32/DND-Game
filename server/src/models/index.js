import sequelize from "../config/connection";
import { Game } from "./game";
import { Character } from "./character";

    const Character = Player(sequelize);
    const Game = Game(sequelize);

    Player.hasMany(Game, { foreignKey: 'player_id' });
    Game.belongsTo(Player, { foreignKey: 'player_id', as: 'game' });

    export { Character, Game };