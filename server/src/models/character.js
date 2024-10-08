import { DataTypes, Model } from "sequelize";

export class Character extends Model {}

export function initializeCharacter(sequelize) {
  Character.init(
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
      class: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hitPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dexterity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        constitution: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        wisdom: {   
            type: DataTypes.INTEGER,
            allowNull: false,
        },      
        charisma: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Game',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },      
    {
        tableName: 'characters',
        sequelize,
    }
    );
    return Character;
}

