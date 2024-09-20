import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveCharacter, updateCharacter, deleteCharacter } from '../api/CharacterAPI';

export const EditCharacter = () => {
    const navigate = useNavigate();
    const [character, setCharacter] = useState({});

const fetchCharacter = async () => {
    try {
        const data = await retrieveCharacter(character.id);
        setCharacter(data);
    } catch (err) {
        console.error('error retrieving character:', err);
    }
};

useEffect(() => {
    fetchCharacter();
}, []);

    const handleNameChange = (e) => {
        setCharacter({ ...character, name: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setCharacter({ ...character, description: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!character.name || !character.description !== null) {
            updateCharacter(character.id, character)
            navigate('/');
        } 
        else {
            console.log('error updating character');
        }
    }

    const handleDelete = async () => {
        try {
            await deleteCharacter(character.id);
            navigate('/characters');
        } catch (err) {
            console.error('error deleting character:', err);
        }
    };

    return (
        <div>
            <h1>Edit Character</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input type="text" value={character.name} onChange={handleNameChange} />
                </label>
                <label>
                    Description
                    <textarea value={character.description} onChange={handleDescriptionChange} />
                </label>
                <button type="submit">Update Character</button>
                <button type="button" onClick={handleDelete}>Delete Character</button>
            </form>
        </div>
    );
}
export default EditCharacter;

