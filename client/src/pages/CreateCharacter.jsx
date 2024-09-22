import { useState } from 'react';
import { createCharacter } from '../api/CharacterAPI';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const CreateCharacter = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const createNewCharacter = async (character) => {
        try {
            const data = await createCharacter(character);
            console.log('created character:', data);
        } catch (err) {
            console.error('error creating character:', err);
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
            await createNewCharacter({ name, description });
            navigate('/characters');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Create a Character</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input type="text" 
                    value={name} 
                    onChange={handleNameChange}
                    placeholder='Enter Character Name'
                    required
                     />
                </label>
                <label>
                    Description
                    <textarea 
                    value={description} 
                    onChange={handleDescriptionChange}
                    placeholder='Enter Character Description'
                    required 
                    />
                </label>
                <button type="submit">Create Character</button>
            </form>
            <button>
                <a href="/edit-character">Edit Character</a>
            </button>
        </div>
    );  
};
export default CreateCharacter;

