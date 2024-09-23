import { Player } from '../models/players.js';

export const seedPlayer = async () => {
    await Player.bulkCreate([
        {
            id: 1,
            username: 'user',
            email: 'user@aol.com',
            password: 'password',
            role: 'player',
        },
        {
            id: 2,
            username: 'admin',
            email: 'admin@fake.com',
            password: 'password',
            role: 'admin',
        },
    ], { individualHooks: true });
}