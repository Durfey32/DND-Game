import { Character } from '../models/character.js';

export const seedCharacter = async () => {
    await Character.bulkCreate([
        {
            name: 'Frodo Baggins', 
            class: 'Rogue',
            level: 1,
            hitPoints: 10,
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
        {
            name: 'Gandalf the Grey',
            class: 'Wizard',
            level: 1,
            hitPoints: 10,
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
        {
            name: 'Aragorn',
            class: 'Fighter',
            level: 1,
            hitPoints: 10,
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
    ], { individualHooks: true });
}
