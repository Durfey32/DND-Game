import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  // Dummy leaderboard data
  const [players, setPlayers] = useState([
    { id: 1, name: "Player1", score: 100 },
    { id: 2, name: "Player2", score: 900 },
    { id: 3, name: "Player3", score: 1500 },
    { id: 4, name: "Player4", score: 1100 },
    { id: 5, name: "Player5", score: 1400 }
  ]);

  // Sorting players by score in descending order
  useEffect(() => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  }, [players]);

  return (
    <div className="leaderboard-container">
      <h1>Game Leaderboard</h1>
      <table className="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;