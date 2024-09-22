import { DataTypes, Model } from "sequelize";
import { Character } from "./character.js";

class Game extends Model {}

function initializeGame(sequelize) {
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      game_master: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
        sequelize,
        modelName: 'Game',
        tableName: 'games',
    });

    Game.hasMany(Character, { 
        foreignKey: 'game_id',
        as: 'game',
     });

     Character.belongsTo(Game, {
            foreignKey: 'game_id',
            as: 'game',
        });

  return Game;
}

export { Game, initializeGame };