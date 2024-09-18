import sequelize from "../config/connection";
import { Game } from "./game";
import { character } from "./character";

    const Player = Player(sequelize);
    const Game = Game(sequelize);

    Player.hasMany(Game, { foreignKey: 'player_id' });
    Game.belongsTo(Player, { foreignKey: 'player_id', as: 'game' });

    export { Player, Game };