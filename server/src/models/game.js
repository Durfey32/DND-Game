import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { Character } from "./character";
import bcrypt from 'bcrypt';
import e from "express";

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
      hooks: {
        beforeCreate: async (newGame) => {
          newGame.game_master = await bcrypt.hash(newGame.game_master, 10);
          return newGame;
        },
        beforeUpdate: async (updatedGame) => {
          updatedGame.game_master = await bcrypt.hash(updatedGame.game_master, 10);
          return updatedGame;
        },
    },
  });

    Game.hasMany(Character, { foreignKey: 'game_id', as: 'characters' });
    Character.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });

  return Game;
}

export { Game, initializeGame };