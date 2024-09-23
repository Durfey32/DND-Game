import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createScore } from "../api/StoryAPI";
import "../index.css";

const Leaderboard = () => {
  // Initialize state
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const dummyPlayers = [
        { id: 1, name: "Player1", score: 100 },
        { id: 2, name: "Player2", score: 90 },
        { id: 3, name: "Player3", score: 85 },
      ];
      setPlayers(dummyPlayers);
    };
    fetchPlayers();
  }, []);

  const createNewScore = async (score) => {
    try {
      const data = await createScore(score);
      console.log('created score:', data);
    } catch (err) {
      console.error('error creating score:', err);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewScore({ name, description });
      navigate('/leaderboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="leaderboard">
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

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter name"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            required
          />
        </label>
        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
};

export default Leaderboard;
