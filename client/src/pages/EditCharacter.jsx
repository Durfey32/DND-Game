import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { retrieveCharacter, updateCharacter, deleteCharacter } from '../api/CharacterAPI';

export const EditCharacter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState({});
    const [error, setError] = useState(null);

const fetchCharacter = async () => {
    try {
        const data = await retrieveCharacter(id);
        setCharacter(data);
    } catch (err) {
        console.error('error retrieving character:', err);
        setError('error retrieving character');
    }
};

useEffect(() => {
    fetchCharacter();
}, [id]);

    const handleNameChange = (e) => {
        setCharacter({ ...character, name: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setCharacter({ ...character, description: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (character.name && character.description) {
            try {
                await updateCharacter(id, character);
                navigate('/edit-character');
            } catch (err) {
                console.error('error updating character:', err);
                setError('error updating character');
            }
        } else {
            setError('name and description are required');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCharacter(id);
            navigate('/edit-character');
        } catch (err) {
            console.error('error deleting character:', err);
            setError('error deleting character');
        }
    };

    return (
        <div>
            <h1>Edit Character</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input 
                        type="text" 
                        value={character.name} 
                        onChange={handleNameChange}
                        placeholder='Enter Character Name'
                        required
                        />
                </label>
                <label>
                    Description
                    <textarea 
                        value={character.description} 
                        onChange={handleDescriptionChange}
                        placeholder='Enter Character Description'
                        required 
                        />
                </label>
                <button type="submit">Update Character</button>
                <button type="button" onClick={handleDelete}>Delete Character</button>
            </form>
        </div>
    );
}
export default EditCharacter;

