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
        const response = await fetch(`/api/games/1`, {
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

const createGame = async (req, res) => {   
    try {
        const gamedata = {
            model : "gpt-3.5-turbo",
            messages : [
      {
        role : "system",
        content : "You are a helpful assistant."
      },
      {
        role : "user",
        content : "Hello!"
      }
    ]
}

        console.log('req.body:', req.body);

        const token = auth.getToken();
        console.log('token:', token);
        if (!token) {
            throw new Error('no token found');
        }
        const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
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

const createGameWithOpenAI = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ error: 'Please provide a name and description for the game.' });
        }

        const formattedPrompt = await formattedPrompt(description);

        const openaiResponse = await promptFunc(formattedPrompt);

        const parsedResponse = await parsedResponse(openaiResponse);

        if (parsedResponse.error) {
            return res.status(500).json({ error: parsedResponse.error });
        }

        const newGame = await Game.create({ 
            name, 
            description, 
            scenario: parsedResponse.scenario, 
            quest: parsedResponse.quest, 
            questions: parsedResponse.questions, 
            options: parsedResponse.options });

        res.status(200).json(newGame);
    } catch (err) {
        console.error('Error in createGame:', err);
        res.status(500).json({ error: 'Failed to create game due to server error.' });
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