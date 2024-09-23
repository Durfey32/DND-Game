import { useState } from 'react';
import { createGame } from  '../api/StoryAPI';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth.js'
import React from 'react';
import '../index.css';

const Storyline = () => {
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    const [gamedata, setGamedata] = useState({
        name: '',
        description: '',
    });
    const navigate = useNavigate();


    const createNewGame = async (gamedata) => {
        try {
        const data = await createGame(gamedata);
        console.log('created game:', data);
        } catch (err) {
        console.error('error creating game:', err);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGamedata({
          ...gamedata,
          [name]: value,
    });
    };
    
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await createNewGame(gamedata);
        navigate(`/Game/${gamedata.name}`);
        } catch (err) {
        console.error(err);
        }
    };
    
    return (
        <div className='storyline'>
        <h1>Create a Game</h1>
        <form onSubmit={handleSubmit}>
            <label className='form'>
            Name
            <input 
            type="text"
            name='name'
             value={gamedata.name || '' } 
             onChange={handleChange} />
            </label>
            <label className='form'>
            Description
            <textarea 
            type="text"
            name='description'
            value={gamedata.description || ''} 
            onChange={handleChange} />
            </label>
            <button type="submit">Create Game</button>
        </form>
        </div>
    );
};

export default Storyline;

