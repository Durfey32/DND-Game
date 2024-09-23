import { Game } from "../models/game.js";

export const seedGame = async () => {
    await Game.sync({ force: true });
  const games = [
    {
      title: "Dungeons & Dragons",
      game_master: "Dungeon Master",
    },
    {
      title: "Pathfinder",
      game_master: "Pathfinder Master",
    },
    {
      title: "Starfinder",
      game_master: "Starfinder Master",
    }, 
    ]; 
    await Game.bulkCreate(games);   
}