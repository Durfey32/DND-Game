import { Player } from '../models/index.js';
import bcrypt from 'bcrypt';

export const seedPlayer = async () => {
    const players = [
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
    ];

     const hashedProfiles = await players.map((player) => {
        return {
          ...player,
          password: bcrypt.hashSync(player.password, 10),
        };
      });
    
      console.log('hashedUsers', hashedProfiles);
    
      await Player.bulkCreate(hashedProfiles);
    };
    
