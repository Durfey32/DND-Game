import React from 'react'
import { useState, useEffect } from 'react'
import { nextGame, createGame } from '../api/StoryAPI.jsx'

export const Game = () => {
  const [rawResponse, setRawResponse] = useState({
    content: '',
    options: [],
  });
  const [isResponseDisplayed, setIsResponseDisplayed] = useState(false);
  const [playerChoice, setPlayerChoice] = useState();
  const [gameData, setGameData] = useState({
    name:'Example Game Name',
    description: 'A description of the game quest where the player will make choices to progress the story'
  });

  useEffect(() => {
    const fetchRawResponse = async () => {
      try {
        const response = await fetch('/api/games/requestForGame', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameData),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch game data');
        }
        const data = await response.json();

        console.log('Raw response:', data);

        const content = data.choices[0].message.content || 0;

        const options = content.match(/(\d+\..+)/g) || [];

        setRawResponse({
          content: content.split('\n\n')[0],
          options: options,
        });
        setIsResponseDisplayed(true);
      } catch (err) {
        console.error('Error in fetchRawResponse:', err);
      }
    }
   
    fetchRawResponse(gameData);
  }, [gameData]);

  const handlePlayerChoiceChange = (e) => {
    setPlayerChoice(e.target.value);
  }
  const handleSubmit = async (e) => {
    try {

        const data = await nextGame(playerChoice);

   
    } catch (err) {
    console.error(err);
    }
};
  
return (
    <div className='Game'>
        <h1>Quest Adventure</h1>
        <div className='quest-content'>
          <p>{rawResponse.content}</p>
        </div>

        <div className='quest-options'>
          <h2>Choose your next action:</h2>
          <ul>
            {rawResponse.options.map((option, index) => (
              <li key={index}>
                <input
                  type='radio'
                  id={option}
                  name='option'
                  value={option}
                  checked={playerChoice === option}
                  onChange={handlePlayerChoiceChange}
                />
                
                <label htmlFor={option}>{option}</label>
              </li>
            ))}
          </ul> 
         
        </div>
       <form onSubmit={handleSubmit}>
        <div>
          <h4>You Chose:</h4> <button type="submit">Next</button>
          <p>{playerChoice}</p>
        </div>
        </form>
    </div>
)
}
export default Game