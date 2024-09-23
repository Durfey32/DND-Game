import { Game } from "../models/index.js";

export const seedGame = async () => {
    await Game.bulkCreate([
    {
      title: "Dungeons & Dragons",
      game_master: "Dungeon Master"
      
    
    },
    {
      title: "Pathfinder",
      game_master: "Pathfinder Master"
     
    },
    {
      title: "Starfinder",
      game_master: "Starfinder Master"
    
    }, 
    ], { individualHooks: true });
}