import { useState } from 'react';
import { createGame } from  '../api/StoryAPI';
import { useNavigate } from 'react-router-dom';

const Storyline = () => {
    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const createNewGame = async (creatGame) => {
        try {
        const data = await createGame(game);
        console.log('created game:', data);
        } catch (err) {
        console.error('error creating game:', err);
        }
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await createNewGame({ name, description });
        navigate('/storyline');
        } catch (err) {
        console.error(err);
        }
    };
    
    return (
        <div>
        <h1>Create a Game</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Name
            <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
            Description
            <textarea value={description} onChange={handleDescriptionChange} />
            </label>
            <button type="submit">Create Game</button>
        </form>
        </div>
    );
};
}
export default Storyline;

