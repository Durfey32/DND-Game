import express from 'express';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate, StructuredOutputParser } from '@langchain/openai';
import dotenv from 'dotenv';
import { Game } from '../../models/game';
dotenv.config();

const router = express.Router();

const openai = process.env.OPENAI_API_KEY;
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

const formatPrompt = async (scenario) => {
    return await promptTemplate.format({ scenario });
};

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
};

const parseResponse = async (response) => {
    try {
        return await parser.parse(response);
    } catch (err) {
        console.error('Error in parseResponse:', err);
        return { error: 'Failed to parse the response from the model.' };
    }
};

export const getGame = async (req, res) => {
    try {
        const gameData = await Game.findAll();
        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createGame = async (req, res) => {
    try {
        const gameData = await Game.create(req.body);
        res.status(200).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updateGame = async (req, res) => {
    try {
        const gameData = await Game.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const deleteGame = async (req, res) => {
    try {
        const gameData = await Game.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const askQuestion = async (req, res) => {
    const userScenario = req.body.question;

    try {
        if (!userScenario) {
            res.status(400).json({ question: null, response: 'Please provide a quest scenario.', formattedResponse: null });
            return;
        }

        const formattedPrompt = await formatPrompt(userScenario);
        const rawResponse = await promptFunc(formattedPrompt);
        const result = await parseResponse(rawResponse);
        res.json({ 
            question: userScenario, 
            quest: result, 
            question: result.question,
            options: result.options,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
        res.status(500).json({ question: userQuestion, prompt: null, response: 'Internal Server Error', formattedResponse: null });
    }
};

export default router;




