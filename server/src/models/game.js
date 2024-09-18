import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { Character } from "./character";

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
    }
  );
  return Game;
}