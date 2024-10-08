import pkg from "convai-web-sdk"
// import ChatBubble,{ useConvaiClient } from "convai-chatui-sdk";
import dotenv from 'dotenv';
import { OpenAI } from 'openai';


dotenv.config();
const client = new OpenAI(process.env.OPENAI_API_KEY);

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//     });
// const openai = new OpenAIApi(configuration);
const covnaiClient = pkg

// const covnaiClient = new pkg({
//     apiKey: process.env.CONVAI_API_KEY,
//     characterId: "your-character-id",
//     enableAudio: false,
//     sessionId: "your-session-id",
//     disableAudioGeneration: true,
//     });

export const generateCharacter = async (req, res) => {
    try {
        const { characterName, characterClass, characterRace } = req.body;
        const prompt = `You are creating a new Dungeons and Dragons character.
        Name: ${characterName}
        Class: ${characterClass}
        Race: ${characterRace}
        `;
        const response = await convaiClient.createCharacter({
            characterName,
            characterClass,
            characterRace,
        });
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            maxTokens: 150,
        });
        const characterDescription = completion.data.choices[0].text.trim();
        res.json({ name, characterClass, characterRace, description: characterDescription });
    } catch (error) {
        console.error('error generating character:', error);
        res.status(500).json({ error: 'error generating character' });
    }
};



