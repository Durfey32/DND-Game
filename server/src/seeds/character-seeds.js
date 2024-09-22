import Character from '../models/character.js';

        const characters = [
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
    ];

    
export const seedCharacter = async () => {
    try {
    await Character.bulkCreate(characters, {
        individualHooks: true,
        returning: true,
    });
    console.log('Characters seeded');
    } catch (err) {
        console.error('Error seeding characters', err);
    }
}