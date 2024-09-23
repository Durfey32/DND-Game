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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
        tableName: 'Game',
        sequelize
    });

  return Game;
}
