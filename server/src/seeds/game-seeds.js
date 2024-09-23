import { Game } from "../models/index.js";

export const seedGame = async () => {
    await Game.bulkCreate([
    {
      name: "Dungeons & Friends",
      description: "On this quest I am with a group of friends, doing a dungeon crawl. Featuring a rogue, a wizard, a fighter, and a cleric facing off with horrible monsters and traps."
      
    },
    {
      name: "Pathfinder",
      description: "On this adventure I am a Path finder. I am with a group of friends and we are lost in the wilderness. We are trying to find our way back to civilization. We are facing off with horrible monsters and traps. The group consists of a rogue, a wizard, a fighter, and a cleric."
     
    },
    {
      name: "Starfinder",
      description: "On this adventure I am a Star finder. I am with a group of friends and we are lost in space. We are trying to find our way back to civilization. We are facing off with horrible monsters and traps. The group consists of a rogue, a wizard, a fighter, and a cleric."
    
    }, 
    ], { individualHooks: true });
}