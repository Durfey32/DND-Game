import { DataTypes, Model } from "sequelize";

export class Player extends Model {}

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
      modelName: 'Player',
      tableName: 'players',
      timestamps: true,
      hooks: {
        beforeCreate: async (player) => {
          player.password = await bcrypt.hash(player.password, 10);
        },
        beforeUpdate: async (player) => {
          player.password = await bcrypt.hash(player.password, 10);
      },
    },
    }
  );

  return Player;
}

