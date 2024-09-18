import { DataTypes, Sequelize, Model } from "sequelize";
import bcrypt from 'bcrypt';

class Character extends Model {
    static async hashPassword(character) {
        character.name = await bcrypt.hash(character.name, 10);
    }
}

function initializeCharacter(sequelize) {
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
    },      
    {
        sequelize,
        modelName: 'Character',
        hooks: {
            beforeCreate: async (newCharacter) => {
                await user.hashPassword(newCharacter);
            },
            beforeUpdate: async (updatedCharacter) => {
                updatedCharacter.name = await bcrypt.hash(updatedCharacter.name, 10);
            },
        },
    }
    );
    return Character;
}

export { initializeCharacter, Character };

