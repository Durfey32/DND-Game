import { DataTypes, Model } from "sequelize";

export class Game extends Model {}

export function initializeGame(sequelize) {
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
        tableName: 'games',
        sequelize
    });

  return Game;
}