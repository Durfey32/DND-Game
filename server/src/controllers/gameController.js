import { Game } from '../models/gameModel';
import { Character } from '../models/characterModel';
import { PromptTemplate, StructuredOutputParser } from '../models/promptTemplateModel';
import dotenv from 'dotenv';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
let model;

if (openaiApiKey) {
    model = new OpenAI({ apiKey: openaiApiKey });
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
        const newGame = await Game.create(req.body);
        res.status(200).json(newGame);
    } catch (err) {
        console.error('Error in createGame:', err);
        res.status(500).json({ error: 'Failed to create game.' });
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

export const askQuestion = async (req, res) => {
    const userScenario = req.body.scenario;

    try {
        if (!userScenario) {
            return res.status(400).json({ scenario:null,  response:'Please provide a scenario for the quest.', formattedResponse: null });
        }

        const formattedPrompt = await formatPrompt(userScenario);
        const response = await promptFunc(formattedPrompt);
        const result = await parseResponse(rawResponse);
        res.json({
            scenario: userScenario,
            quest: result.quest, 
            question: response.questions, 
            options: result.options 
        });
    } catch (err) {
        console.error('Error in askQuestion:', err);
        res.status(500).json({ error: 'Failed to ask a question.' });
    }
};

