import { DataTypes, Model } from "sequelize";
import bcrypt from 'bcrypt';

export class Player extends Model {
  async setPassword(password) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function initializePlayer(sequelize) {
  Player.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'player',
      },
    },
    {
      sequelize,
      tableName: 'players',
      timestamps: true,
      hooks: {
        beforeCreate: async (player) => {
          await player.setPassword(player.password);
        },
        beforeUpdate: async (player) => {
          await player.setPassword(player.password);
      },
    },
  }, {
    tableName: 'players',
    sequelize
  });

  return Player;

}