import { Game } from '../models/game.js';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';


dotenv.config();

// import { GoogleGenerativeAI } from ('google-generative-ai');
// const genAI = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY });
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// const chat = model.startChat({
//     history: [
//         { role: 'user',
//           parts: [{ text: "DND related quest"}]
//         },
//         { role: 'model',
//           parts: [{ text: "You are a Dungeon Master creating a Dungeons and Dragons (D&D) quest for players. Narrate a quest where players are faced with an adventure. Ask them an important question during the quest and provide them with multiple options for how to proceed. Make it engaging and immersive. Quest Scenario: "}]
//         }
//     ]
// })
// let results = await chat.sendMessage({ text: "Write a story about a magic world where dragons and wizards live together in harmony." });
// console.log(results.response.text());
// results = await chat.sendMessage({ text: "What is the question you would like to ask the players?" });
// console.log(results.response.text());

// const prompt = "Write a story about a magic world where dragons and wizards live together in harmony.";


const openaiApiKey = process.env.OPENAI_API_KEY;
let model;

if (openaiApiKey) {
    model = new OpenAI({ temperature: 0.7, openAIApiKey: openaiApiKey, modelName: 'gpt-3.5-turbo' });
} else {
    console.error('No OpenAI API key found. Please set one in your .env file.');
}

const parser = StructuredOutputParser.fromNamesAndDescriptions({
    quest: 'A detailed D&D quest scenario',
    question: 'A specific question for players to answer during the quest',
    options: 'Possible options for players to choose from during the quest',
});

const formatInstructions = parser.getFormatInstructions();

const promptTemplate = new PromptTemplate({
    template: `You are a Dungeon Master creating a Dungeons and Dragons (D&D) quest for players.
    Narrate a quest where players are faced with an adventure.
    Ask them an important question during the quest and provide them with multiple options for how to proceed.
    Make it engaging and immersive.

    {format_instructions}

    Quest Scenario: {scenario}`,
    inputVariables: ["scenario"],
    partialVariables: { format_instructions: formatInstructions }
});




const formatPrompt = async (scenario) => await promptTemplate.format({ scenario });

const promptFunc = async (input) => {
    try {
        if (model) {
            return await model.invoke(input);
        }
        return "No OpenAI API key provided. Unable to provide a response.";
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const parseResponse = async (response) => {
    try {
        return await parser.parse(response);
    } catch (err) {
        console.error('Error in parseResponse:', err);
        return { error: 'Failed to parse the response from the model.' };
    }
}

export const askQuestion = async (req, res) => {
    const userScenario = req.body.scenario;

    try {
        if (!userScenario) {
            return res.status(400).json({ scenario:null,  response:'Please provide a scenario for the quest.', formattedResponse: null });
        }

        const formattedPrompt = await formatPrompt(userScenario);
        const response = await promptFunc(formattedPrompt);
        const result = await parseResponse(response);
        res.json({
            scenario: userScenario,
            quest: result.quest, 
            question: result.questions, 
            options: result.options 
        });
    } catch (err) {
        console.error('Error in askQuestion:', err);
        res.status(500).json({ error: 'Failed to ask a question.' });
    }
};

export const getAllGames = async (req, res) => {
    try {
        const allGames = await Game.findAll();
        res.status(200).json(allGames);
        } catch (err) {
        console.error('Error in getAllGames:', err);
        res.status(500).json({ error: 'Failed to retrieve all games.' });
    }
};

export const createGame = async (req, res) => {
    try {

        console.log('req.body:', req.body);
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ error: 'Please provide a name and description for the game.' });
        }

        const newGame = await Game.create(req.body);
        res.status(200).json(newGame);
    } catch (err) {
        console.error('Error in createGame:', err);
        res.status(500).json({ error: 'Failed to create game due to server error.' });
    }
};

export const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedGame[0] === 0) {
      res.status(404).json({ error: 'No game found with this id!' });
    }
    res.status(200).json({ message: 'Game updated successfully!' });
  } catch (err) {
    console.error('Error in updateGame:', err);
    res.status(500).json({ error: 'Failed to update game.' });
  }
};



export const deleteGame = async (req, res) => {
    try {
        const deletedGame = await Game.destroy({
        where: {
            id: req.params.id,
        },
        });
    
        if (!deletedGame) {
        res.status(404).json({ error: 'No game found with this id!' });
        }
        res.status(200).json({ message: 'Game deleted successfully!' });
    } catch (err) {
        console.error('Error in deleteGame:', err);
        res.status(500).json({ error: 'Failed to delete game.' });
    }
};    

export const test = async (req, res) => {  
    const completion = await model.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "What is the purpose of life?"},
            {"role": "assistant", "content": "The purpose of life is to be happy."}],
        model: "gpt-3.5-turbo",
    })
    res.json({ completion });
}



