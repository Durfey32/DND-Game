const retrieveCharacters = async () => {
    try {
        const response = await fetch(`/api/characters`, {
            headers: {
                'Content-Type': 'application/json'
            }
            });
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error('invalid character API response, check the server logs');
        }

        return data;
    } catch (error) {
        console.error('error retrieving character data:', error);
        return [];
    }
};

const retrieveCharacter = async (characterId) => {
    try {
        const response = await fetch(`/api/characters/${characterId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
            });
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error('invalid character API response, check the server logs');
        }
    
        return data;
    } catch (error) {
        console.error('error retrieving character data:', error);
        return Promise.reject('error retrieving character data');
    }
}

const createCharacter = async (characterData) => {
    try {
        const response = await fetch(`/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterData)
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('invalid character API response, check the server logs');
        }

        return data;
    } catch (error) {
        console.error('error creating character:', error);
        return Promise.reject('error creating character');
    }
};

const updateCharacter = async (characterId, characterData) => {
    try {
        const response = await fetch(`/api/characters/${characterId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterData)
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('invalid character API response, check the server logs');
        }

        return data;
    } catch (error) {
        console.error('error updating character:', error);
        return Promise.reject('error updating character');
    }
};

const deleteCharacter = async (characterId) => {
    try {
        const response = await fetch(`/api/characters/${characterId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('invalid character API response, check the server logs');
        }

        return data;
    } catch (error) {
        console.error('error deleting character:', error);
        return Promise.reject('error deleting character');
    }
};

export {
    retrieveCharacters,
    retrieveCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
};