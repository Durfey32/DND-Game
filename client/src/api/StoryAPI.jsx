import auth from '../utils/auth.js';

const retrieveGames = async () => {
    try {
        const response = await fetch(`/api/games/`, {
            headers: {
                'Content-Type': 'application/json'
            }
            });
    
        if (!response.ok) {
            throw new Error('invalid game API response, check the server logs');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error retrieving game data:', error);
        return [];
    }
};

const retrieveGame = async (gameId) => {
    try {
        const response = await fetch(`/api/games/${gameId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
            });
    
        if (!response.ok) {
            throw new Error('invalid game API response, check the server logs');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error retrieving game data:', error);
        return Promise.reject('error retrieving game data');
    }
};

const createGame = async (gamedata, token) => {   
    try {
        const token = auth.getToken();
        const response = await fetch(`/api/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(gamedata)
        });
    
        if (!response.ok) {
            throw new Error('invalid game API response, check the server logs');
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error creating game:', error);
        return Promise.reject('error creating game');
    }
};

const updateGame = async (gameId, gameData) => {
    try {
        const response = await fetch(`/api/games/${gameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        });
    
        if (!response.ok) {
            throw new Error('invalid game API response, check the server logs');
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error updating game:', error);
        return Promise.reject('error updating game');
    }
};

const deleteGame = async (gameId) => {
    try {
        const response = await fetch(`/api/games/${gameId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('invalid game API response, check the server logs');
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error deleting game:', error);
        return Promise.reject('error deleting game');
    }
};  

const createScore = async (scoreData) => {
    try {
        const response = await fetch(`/api/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scoreData)
        });

        if (!response.ok) {
            throw new Error('invalid score API response, check the server logs');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error creating score:', error);
        return Promise.reject('error creating score');
    }
};

export { retrieveGames, retrieveGame, createGame, updateGame, deleteGame, createScore };