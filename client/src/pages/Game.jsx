import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { retrieveGame, updateGame, deleteGame } from '../api/StoryAPI'
import '../index.css'

export const Game = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

useEffect(() => {
    const fetchGame = async () => {
        try {
            const data = await retrieveGame(id);
            setGame(data);
        } catch (err) {
            console.error('error retrieving game:', err);
            setError('error retrieving game');
        }
    }

    fetchGame();
}, [id]);

const handleEdit = async () => {
    navigate(`/storyline/game/edit/${id}`);
};

if (error) {
    return <div>{error}</div>;
}

if (!game) {
    return <div>Loading...</div>;
}

const handleDelete = async () => {
    try {
        await deleteGame(id);
        navigate('/storyline');
    } catch (err) {
        console.error('error deleting game:', err);
    }
}


return (
    <div className='Game'>
      <h1>{game.name}</h1>
      <div className='Game-info'>
        <h2>Game Description:</h2>
        <p>{game.description}</p>

        <h2>Quest:</h2>
        <p>{game.quest}</p>

        <h3>Question:</h3>
        <p>{game.questions}</p>

        <h3>Options:</h3>
        <ul>
          {game.options && game.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>

      <div className='Game-characters'>
        <h2>Characters</h2>
        <ul>
          {game.characters && game.characters.map((character, index) => (
            <li key={index}>{character.name}</li>
          ))}
        </ul>
      </div>

      <div className='Game-actions'>
        <button className='btn btn-primary' onClick={handleEdit}>Edit</button>
        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
export default Game

