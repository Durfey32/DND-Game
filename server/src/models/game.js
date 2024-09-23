import { DataTypes, Model } from "sequelize";
import { Character } from "./character.js";

export class Game extends Model {}

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



  return Game;
}

export { initializeGame };