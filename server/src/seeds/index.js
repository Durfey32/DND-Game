import sequelize from "../config/connection";
import { seedGame } from "./game-seeds";
import { seedCharacter } from "./character-seeds";

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await seedGame();
        console.log('\n----- GAMES SEEDED -----\n');
        await seedCharacter();
        console.log('\n----- CHARACTERS SEEDED -----\n');

        process.exit(0);
    } catch (err) {
        console.error('----- ERROR SYNCING DATABASE -----\n', err);
        process.exit(1);
    } 
};

seedAll();